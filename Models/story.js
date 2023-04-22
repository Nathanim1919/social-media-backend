const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // Time to live (TTL) index of 24 hours
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reaction: {
            type: String,
            enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry']
        }
    }]
});


storySchema.index({
    createdAt: 1
}, {
    expireAfterSeconds: 86400 // Set the index to expire after 24 hours
});


module.exports.Story = mongoose.model('Story', storySchema);