const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate({
            path : 'user',
            select: '-password'})
        .populate({
            path : "comments",
            options: { sort: { 'createdAt': -1 } },
            populate : {
                path: "user",
            }
        });
    return res.status(200).json({
        message : "List of Posts",
        posts : posts
    });
};

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);

        post.remove();

        await Comment.deleteMany({post : req.params.id});


        return res.status(200).json({
            message : "Post Deleted"
        })

    }catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    };
};