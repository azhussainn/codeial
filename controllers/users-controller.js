module.exports.profile = function(req, res){
    return res.render('user_profile.ejs', {
        title : 'My Profile'
    })
}
//render sign-In Page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in.ejs', {
        title : 'Sign In'
    })
}

//render sign-Up Page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up.ejs', {
        title : 'Sign Up'
    })
}

//get the sign up data
module.exports.create = function(req, res){
    //to do later
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    //to do later
}

module.exports.posts = function(req, res){
    return res.end("<h1>Your Post has been uploaded</h1>")
}
