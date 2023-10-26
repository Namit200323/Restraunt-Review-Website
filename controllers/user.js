const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('users/register');
}

module.exports.registerUser = async(req,res)=>{
    const {email,username,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser,err=>{
        if(err) return next(err); 
        req.flash('success','Welcome to yelp camp!!');
        res.redirect('/restr');
    })
}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success','Welcome Back!');
    res.redirect('/restr');
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Successfully Logged Out!!');
        res.redirect('/restr');
    });
}