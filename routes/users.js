const express = require('express');
const router = express.Router({mergeParams:true});
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/user');

router.route('/register')
    .get(users.renderRegister)
    .post(users.renderRegister);

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}),users.loginUser )

router.get('/logout', users.logoutUser); 

module.exports = router;