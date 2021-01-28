const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : "870821431789-hpvr5sa9q3t4vr9khuopdllcc44b0ivl.apps.googleusercontent.com",
    clientSecret : "ETw-tqFWhmYtkJeSv3-n49pq",
    callbackURL : "http://localhost:8000/user/auth/google/callback"
    },

    //find a user
    function(accessToken, refreshToken, profile, done){
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy passport', err); return;}

            console.log(profile);

            //if user found, set user as req.user
            if(user){
                return done(null, user);
            }else{

                //if not found, create the user and set the user as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user using google strategy passport', err); return;}
                    console.log(user);
                        return done(null, user);
                    
                    
                });
            }

        });
    }
));

module.exports = passport;