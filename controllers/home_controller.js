const Post = require('../models/post');
module.exports.home = function(req, res){

    //find posts details (i.e post content)
    Post.find({})

    //get users details from the posts (i.e post user name)
    .populate('user')

    .populate({
        //get comments from the posts (i.e post comments)
        path : "comments",

        populate : {
            //get user details from the comments i.e (post comment user name)
            path: "user"
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title : "Codeial | Home",
            posts : posts
        });
    })
}