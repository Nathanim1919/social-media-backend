const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    }
})

module.exports.Conversation = mongoose.model('Conversation', conversationSchema);