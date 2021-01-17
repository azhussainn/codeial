const User = require('../models/user');

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

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err, user){

        //if problem in finding user in db
        if(err){console.log('error in finding user while signing up'); return};

        if(!user){ User.create(req.body, function(err, user){
            if(err){console.log('error in creating user while signing up'); return};
            return res.redirect('/user/sign-in')})}

        //if  user found
        else{return res.redirect('back')};
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    //to do later
}

module.exports.posts = function(req, res){
    return res.end("<h1>Your Post has been uploaded</h1>")
}
