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
                req.flash('success', 'Comment Published!');
                return res.redirect('back');
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
        req.flash('error', 'Comment cannot be empty!');
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);

        let post = await Post.findById(comment.post);

        if(post.user == req.user.id || comment.user == req.user.id){
            let postId = comment.post;

            //deleting the comment
            comment.remove();

            //removing comment reference from the post array
            let post = await Post.findByIdAndUpdate(postId,
                {$pull : {comments : req.params.id}});

            req.flash('success', 'Comment Deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'You cannot delete this comment!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

}