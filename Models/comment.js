const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports.Comment = mongoose.model('Comment', commentSchema);