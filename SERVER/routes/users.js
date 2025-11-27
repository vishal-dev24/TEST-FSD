const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/A_DATABASE')

mongoose.connect('mongodb+srv://spancovishal:HzLLrkUjyhrqFz3X@cluster0.bre00kg.mongodb.net/test-fsd')
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("DB Error:", err);
    });

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('User', UserSchema);
