const User = require('../models/user');

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
                if(err){console.log("*****Multer error:", err); return}
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + "/" + req.file.filename;

                }
                user.save();
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