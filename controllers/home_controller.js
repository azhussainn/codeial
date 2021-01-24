const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try{
        //populate user of each post
        //then get users details from the posts (i.e post user name)
        //then get comments from the posts (i.e post comments)
        //then get user details from the comments i.e (post comment user name)
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path : "comments",
                populate : {
                    path: "user"
                }
            });
        let users = await User.find({});

        return res.render('home', {
            title : "Codeial | Home",
            posts : posts,
            all_users : users
        });
    }catch(err){
        console.log('Error', err);
        return;
    }

};