const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req, res){
    if(req.body.content != ""){
        Post.create({
            content : req.body.content,
            user : req.user._id
        }, function(err, post){
            if(err){ console.log('error in creating post');return }
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
    Post.findById(req.params.id, function(err, post){
        if(err){console.log('error in deleting the post'); return}
        else{
            //.id means converting thr object id into string
            if(post.user == req.user.id){
                post.remove();
                Comment.deleteMany({post : req.params.id}, function(err){
                    if(err){console.log('error in deleting the comments'); return}
                    else{
                        return res.redirect('back');
                    }
                })
            }
            else{
                return res.redirect('back');
            }
        }
    })
}