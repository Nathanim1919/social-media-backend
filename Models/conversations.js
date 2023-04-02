const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    }
})

module.exports.conversation = mongoose.model('Conversation',conversationSchema);