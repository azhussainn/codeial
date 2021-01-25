const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function(req, res){
    if(req.body.content != ""){
        try{
            let post = await Post.findById(req.body.post);
            if(post){
                let comment = await Comment.create({
                    content : req.body.content,
                    user : req.user._id,
                    post : req.body.post
                });
                post.comments.push(comment);
                post.save();

                if (req.xhr){
                    // Similar for comments to fetch the user's id!
                    comment = await comment.populate('user', 'name').execPopulate();
        
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }else{
                    req.flash('success', 'Comment Published!');
                    return res.redirect('back');
                }
            }

            else{
                req.flash('error', 'You cannot comment here!');
                return res.redirect('back');
                }
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{
        if(req.xhr){
            return  res.status(400).json(
                { message : "Comment cannot be empty" });
        }else{
            req.flash('error', 'Comment cannot be empty!');
            return res.redirect('back');
        }
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }else{
                req.flash('success', 'Comment deleted!');
                return res.redirect('back');
            }
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}
