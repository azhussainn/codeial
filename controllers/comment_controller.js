const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = function(req, res){
    if(req.body.content != ""){
        Post.findById(req.body.post, function(err, post){
            if(post){
                Comment.create({
                    content : req.body.content,
                    user : req.user._id,
                    post : req.body.post
                }, function(err, comment){
                    if(err){ console.log('error in creating a comment'); return }
                    else{
                        post.comments.push(comment);
                        post.save();
                        return res.redirect('back');
                    }
                })
            }
            else{
                return res.redirect('back');
            }
        })
    }
    else{
        return res.redirect('back');
    }

}