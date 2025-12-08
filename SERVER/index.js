const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userModel = require('./routes/users');
const postModel = require('./routes/posts');
const upload = require('./routes/cloudinary');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'https://test-fsd-1.onrender.com', credentials: true }));

// REGISTER
app.post('/register', upload.single('image'), async (req, res) => {
    const { username, email, password } = req.body;
    const imageUrl = req.file?.path || null;
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hash, image: imageUrl })
    const token = jwt.sign({ email, userid: user._id }, "shhh");
    res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "registered" })
});

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json('user not found');
    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.json("wrong password");
    const token = jwt.sign({ email, userid: user._id }, "shhh");
    res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "Logged in" });
});

// ===== Middleware for Auth =====
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    const { userid, email } = jwt.verify(token, "shhh");
    req.user = { _id: userid, email };
    next();
}

// PROFILE
app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('posts');
    res.json(user);
});

// LOGOUT
app.get('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "Logged out" });
});

// CREATE POST
app.post('/create', upload.single('image'), isLoggedIn, async (req, res) => {
    const { title } = req.body;
    let imageUrl = null;
    if (req.file) imageUrl = req.file.path;
    const post = await postModel.create({ title, image: imageUrl, user: req.user._id });
    await userModel.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } });
    res.json(post)
    console.log("haye loooo", { post })
});

// DELETE POST
app.delete('/delete/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findByIdAndDelete(req.params.id);
    if (post) { await userModel.findByIdAndUpdate(req.user._id, { $pull: { posts: post._id } }) }
    res.json({ message: "Post deleted" });
});

// GET POST
app.get('/getPost/:id', async (req, res) => {
    const post = await postModel.findById(req.params.id);
    res.json(post);
});

// UPDATE POST
app.put('/update/:id', upload.single('image'), async (req, res) => {
    const { title } = req.body;
    const imagefile = req.file ? req.file.path : null;
    const post = await postModel.findByIdAndUpdate(req.params.id, { title, image: imagefile }, { new: true });
    res.json(post);
});

app.listen(3000, () => console.log("Server running on port 3000"));