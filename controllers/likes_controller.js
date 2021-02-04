const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req, res){
    try {
        // likes/toggle/?id =123&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == "Post"){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like already exists
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        });

        //if a like already exists then delete it
        if(existingLike){

            //removing it from the comment or post likes array
            likeable.likes.pull(existingLike._id);
            likeable.save();

            //deleting the object
            existingLike.remove();
            deleted = true;

        }else{
            // make a new like

            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            });

            //adding it to the post / comment likes array
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message : "Request Successful",
            data : {
                deleted : deleted
            }
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}