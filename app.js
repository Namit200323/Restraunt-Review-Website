const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Restr = require('./models/restr');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MERN');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/restr',async(req,res)=>{
    const rests = await Restr.find({});
    res.render('restr/index',{rests})
})

app.listen(200,()=>{
    console.log('Listening on port 200');
})
