module.exports.profile = function(req, res){
    return res.end("<h1>User Profile</h1>");
}

module.exports.posts = function(req, res){
    return res.end("<h1>Your Post has been uploaded</h1>")
}