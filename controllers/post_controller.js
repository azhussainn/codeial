const Post = require('../models/post');
module.exports.create = function(req, res){
    if(req.body.content != "" && req.isAuthenticated()){
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