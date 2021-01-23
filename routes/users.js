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

module.exports = router;