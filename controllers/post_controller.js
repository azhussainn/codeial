const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    if(req.body.content != ""){
        try{
            let post = await Post.create({
                content : req.body.content,
                user : req.user._id
            });
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post : post,
                        name : req.user.name
                    },
                    message : "Post created!"
                });
            }else{
                req.flash('success', 'Post Published!');
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
                { message : "Post cannot be empty" });
        }else{
            req.flash('error', "Post cannot be empty");
            return res.redirect('back');
        }
    }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            
            await Comment.deleteMany({post : req.params.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id,
                    },
                    message : 'Post deleted'
                });
            }else{
                
                req.flash('success', 'Post Deleted!');
                return res.redirect('back');
            }
        }
        else{
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        };
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    };
};