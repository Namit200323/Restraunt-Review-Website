const express = require('express');
const router = express.Router({mergeParams:true});
const User = require('../models/user');
const passport = require('passport');

router.get('/register',(req,res)=>{
    res.render('users/register');
})

router.post('/register',async(req,res)=>{
    const {email,username,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser,err=>{
        if(err) return next(err); 
        req.flash('success','Welcome to yelp camp!!');
        res.redirect('/restr');
    })
})

router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.post('/login',passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success','Welcome Back!');
    res.redirect('/restr');
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Successfully Logged Out!!');
        res.redirect('/restr');
    });
}); 

module.exports = router;