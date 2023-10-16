// This is the change
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Restr = require('./models/restr');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MERN');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs',ejsMate)

app.use(express.urlencoded());
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/restr',async(req,res)=>{
    const rests = await Restr.find({});
    res.render('restr/index',{rests})
})

app.get('/restr/new',(req,res)=>{
    res.render('restr/new');
})

app.post('/restr',async(req,res)=>{
    const restr = new Restr(req.body.restr);
    await restr.save();
    res.redirect(`/restr/${restr._id}`);
})

app.get('/restr/:id',async(req,res)=>{
    const rest = await Restr.findById(req.params.id);
    res.render('restr/show',{rest});
})

app.get('/restr/:id/edit',async(req,res)=>{
    const rest = await Restr.findById(req.params.id);
    res.render('restr/edit',{rest});
})

app.put('/restr/:id',async(req,res)=>{
    const {id} = req.params;
    const restr = await Restr.findByIdAndUpdate(id,{...req.body.restr});
    res.redirect(`/restr/${restr._id}`);
})

app.delete('/restr/:id',async(req,res)=>{
    const {id} = req.params;
    await Restr.findByIdAndDelete(id);
    res.redirect('/restr');
})

app.listen(201,()=>{
    console.log('Listening on port 200');
})
