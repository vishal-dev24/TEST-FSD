const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/A_DATABASE')
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: { type: String, default: "" },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('User', UserSchema);
