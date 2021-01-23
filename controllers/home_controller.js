const Post = require('../models/post');
const User = require('../models/user');

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
        User.find({}, function(err, users){
            return res.render('home', {
                title : "Codeial | Home",
                posts : posts,
                all_users : users
            });
        })
    })
}