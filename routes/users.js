const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users-controller');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    "local",
    {failureRedirect : '/user/sign-in'}),
     usersController.createSession);


router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google',{ failureRedirect : "/user/sign-in"}), usersController.createSession);
router.get('/forgot-password', usersController.resetPasswordMail);
router.post('/forgot-password', usersController.checkMail);
router.get('/reset-password', usersController.resetPasswordForm);
router.post('/reset-password/:id', usersController.resetPassword);

module.exports = router;