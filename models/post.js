const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const STATUS_PATH = path.join('/uploads/users/posts');

const postSchema = new mongoose.Schema({
    content : {
        type : String, 
        required : true
    },
    user : {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //include the array of ids of all comments in the post schema itself
    comments : [
        {
            type :mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
}, {
    timestamps : true
});

postSchema.statics.statusPath = STATUS_PATH;

const Post = mongoose.model('Post', postSchema);

module.exports = Post;