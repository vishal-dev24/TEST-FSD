const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    image: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

});

module.exports = mongoose.model('Post', PostSchema);
