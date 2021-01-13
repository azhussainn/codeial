module.exports.profile = function(req, res){
    return res.render('users.ejs', {
        title : 'My Profile',
        name : 'Azhar'
    })
}

module.exports.posts = function(req, res){
    return res.end("<h1>Your Post has been uploaded</h1>")
}