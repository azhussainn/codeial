const User = require('../models/user');
const UserToken = require('../models/user_password_token');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const forgetMailer = require('../mailers/forgot_password');
const TokenPassword = require('../models/user_password_token');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile.ejs', {
            title : 'My Profile',
            profile_user : user
        })
    })
}

module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log("*****Multer error:", err);
                req.flash('error', 'You cant Upload that');
                return res.redirect('back');
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + "/" + req.file.filename;
                }
                user.save();
                req.flash('success', 'Profile updated');
                return res.redirect('back');
            });

        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'UnAuthorized');
        return res.status(401).send('UnAuthorized');
    }
}

//render sign-In Page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in.ejs', {
        title : 'Sign In'
    })
}

//render sign-Up Page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up.ejs', {
        title : 'Sign Up'
    })
}

//get the sign up data
module.exports.create = async function(req, res){

    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'passwords do not match!');
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email : req.body.email});

        if(!user){
            let user = await User.create(req.body);
            req.flash('success', 'Account Created');
            return res.redirect('/user/sign-in');
        }
        else{
            req.flash('error', 'Account already exists');
            return res.redirect('back');
        };
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}


//sign-out
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}

//reset password
module.exports.resetPasswordMail = function(req, res){
    res.render('../views/reset_email', {
        title : "Enter Account Details"
    });
};

module.exports.checkMail = async function(req, res){
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user){
            req.flash('error', "Account does not exist!");
            return res.redirect('back');
        }
        let token = await UserToken.create({
            accessToken : crypto.randomBytes(20).toString('hex'),
            user : user._id
        });
        token = await token.populate('user', 'name email').execPopulate();
        forgetMailer.resetPasswordMail(token);

        req.flash('success', 'Password reset link sent to your mail');
        return res.redirect('/user/sign-in');
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }
}

module.exports.resetPasswordForm = async function(req, res){
        try {
            let token = await TokenPassword.findOne(req.query);
            if(req.query['accessToken'] && token && token.isValid){
                token = await token.populate('user', 'name').execPopulate();
                console.log(token);
                return res.render('../views/reset_password.ejs', {
                    title : "Enter New Password",
                    token : token
                });
            }else{
                req.flash('error', 'Not Authorized!');
                return res.redirect('back');
            }
        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }
}

module.exports.resetPassword = async function(req, res){
    if(req.body['password'] == req.body['confirm-password']){
        try {
            let token = await TokenPassword.findById(req.params.id); 
            let user = await User.findById(token.user);
            token.isValid = false;
            user.password = req.body['password'];
            user.save();
            token.save();
            req.flash('success', 'Password changed');
            return res.redirect('/');

        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
}