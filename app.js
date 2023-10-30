if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}


const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Restr = require('./models/restr');
const Review = require('./models/review');
const User = require('./models/user');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrat = require('passport-local');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MERN');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const restr = require('./routes/restr');
const review = require('./routes/review');
const user = require('./routes/users')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs',ejsMate)

app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static('public'));
const sessionConfig = {
  secret : 'secretshhhhh',
  resave : false,
  saveUninitialized  : true,
  cookie : {
    expires : Date.now() + 1000*60*60*24*7, // For week from now
    maxAge: 1000*60*60*24*7
  }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res)=>{
    res.render('home');
})

app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  next();
})

app.use('/restr',restr); 
app.use('/restr/:id/reviews',review); 
app.use('/',user);

app.get('/fakeuser',async(req,res)=>{
  const user = new User({email:'namit1@gmail.com',username:'namit1'})
  const newUser = await User.register(user,'chicken')
  res.send(newUser)
})

app.listen(207,()=>{
    console.log('Listening on port 207');
})
