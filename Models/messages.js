const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    }
})

module.exports.message = mongoose.model('Message', messageSchema);