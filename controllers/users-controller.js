const User = require('../models/user');

module.exports.profile = function(req, res){

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title : "My Profile",
                    user : user
                })
            }
            return res.redirect('/user/sign-in');
        })
    }
    else{
        return res.redirect('/user/sign-in');
    }
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

    //Steps to authenticate
    //find the user
    User.findOne({email : req.body.email}, function(err, user){
        if(err){console.log('error in finding user while signing in'); return};

        //handle user found
        if(user){
            //handle password not matched
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        }

        //handle user not found
        else{
            return res.redirect('back');
        }
    })
}
module.exports.posts = function(req, res){
    return res.end("<h1>Your Post has been uploaded</h1>")
}
