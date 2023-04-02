const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    photo:{
        type:String,
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    }],

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [{
        type:Schema.Types.ObjectId,
        ref:'User',
    }],
}, {
    timestamps: true,
});



module.exports.Post = mongoose.model('Post', postSchema);