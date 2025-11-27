const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const userModel = require('./routes/users')
const postModel = require('./routes/posts')
const upload = require('./routes/multer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const path = require('path')
app.use(cookieParser());
app.use(express.json())
const allowedOrigins = [
    "https://test-fsd.onrender.com",
    "https://test-fsd-1.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'CORS policy: Not allowed';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Define routes
app.post('/register', upload.single('image'), async (req, res) => {
    const { username, email, password } = req.body;
    const imagefile = req.file ? req.file.filename : null;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const CU = await userModel.create({ username, email, password: hash, image: imagefile })
            const token = jwt.sign({ email: email, userid: CU._id }, "shhh")
            res.cookie('token', token)
            res.json()
            console.log("hmmmmmmmm", { CU })
        })
    })
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) return res.json('user not found')
    bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
            const token = jwt.sign({ email: email, userid: user._id }, "shhh")
            res.cookie('token', token)
            res.json()
            console.log("hmmmmminggg loginnnnn", { user })
        } else return res.json("hmmmmminggg no")
    })
})
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login')
    const { userid, email } = jwt.verify(token, "shhh")
    req.user = { _id: userid, email }
    next()
}
app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('posts')
    res.json(user)
})
app.get('/logout', (req, res) => {
    res.cookie('token', '')
    res.json()
})

// -------- CRUD OPERATION ______________
app.post('/create', upload.single('image'), isLoggedIn, async (req, res) => {
    const { title } = req.body;
    const imagefile = req.file ? req.file.filename : null;
    const post = await postModel.create({ title, image: imagefile, user: req.user._id })
    await userModel.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
    res.json(post)
    console.log("ha post ", { post })
})
app.delete('/delete/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findByIdAndDelete(req.params.id)
    if (post) await userModel.findByIdAndUpdate(req.user._id, { $pull: { posts: post._id } })
    res.json()
})


app.get('/getPost/:id', async (req, res) => {
    const post = await postModel.findById(req.params.id)
    res.json(post);
})

app.put('/update/:id', upload.single('image'), async (req, res) => {
    const imagefile = req.file ? req.file.filename : null;
    const { title } = req.body
    const post = await postModel.findByIdAndUpdate(req.params.id, { title, image: imagefile }, { new: true })
    res.json(post)
})

app.listen(3000, () => { console.log(`Server is running on port 3000`) })