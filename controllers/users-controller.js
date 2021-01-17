module.exports.profile = function(req, res){
    return res.render('userProfile.ejs', {
        title : 'My Profile'
    })
}

module.exports.posts = function(req, res){
    return res.end("<h1>Your Post has been uploaded</h1>")
}