const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true
    },
    function(req, email, password, done){
        //find a user and establish the identity
        User.findOne({email : email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        })
    }
));


//serializing the user to decide which key is to be kept in cookies
//basically setting the user id in the cookie and also encrypting it
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//de-serializing the user from the key in the cookies
//basically getting the user id from the cookie and also decrypting it
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding error --> Passport');
            return done(err);
        }
        return done(null, user);
    })
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if user is signed-in
    //then pass the request to the next function(i.e controllers action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed-in user from the session cookie
        //and we are sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;