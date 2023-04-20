const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storySchema = new Schema({
    images:{
        type:String,
        required:true
    }
}, {
    timestamps: true,
});
module.exports.Story = mongoose.model('Comment', storySchema);