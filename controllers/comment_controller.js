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

module.exports.destroy = function(req, res){
    
    Comment.findById(req.params.id, function(err, comment){

        Post.findById(comment.post, function(err, post){
            if(err){console.log('error in finding post'); return }
            else{
                if(post.user == req.user.id || comment.user == req.user.id){
                    let postId = comment.post;

                    //deleting the comment
                    comment.remove();

                    //removing comment reference from the post array
                    Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}}, function(err, post){
                        return res.redirect('back');
                    })
                }
                else{
                    return res.redirect('back');
                }
            }
        })
    })
}