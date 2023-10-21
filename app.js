// This is the change
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Restr = require('./models/restr');
const Review = require('./models/review');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MERN');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const restr = require('./routes/restr');
const review = require('./routes/review');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs',ejsMate)

app.use(express.urlencoded());
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.use('/restr',restr); 
app.use('/restr/:id/reviews',review); 


app.listen(205,()=>{
    console.log('Listening on port 205');
})
