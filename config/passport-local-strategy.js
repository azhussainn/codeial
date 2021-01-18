const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email, password, done){
        //find a user and establish the identity
        User.findOne({email : email}, function(err, user){
            if(err){
                console.log('error in finding error --> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
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

module.exports = passport;