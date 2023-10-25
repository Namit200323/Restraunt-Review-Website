const express = require('express');
const router = express.Router({mergeParams:true});
const Restr = require('../models/restr');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware')

router.get('/',async(req,res)=>{
    const rests = await Restr.find({});
    res.render('restr/index',{rests})
})
router.get('/new',isLoggedIn,(req,res)=>{
    res.render('restr/new');
})

router.post('/',isLoggedIn,async(req,res)=>{
    const restr = new Restr(req.body.restr);
    restr.author = req.user._id;
    await restr.save();
    req.flash('success','Successfully made a new review!')
    res.redirect(`/restr/${restr._id}`);
})

router.get('/:id',async(req,res)=>{
    const rest = await Restr.findById(req.params.id).populate('reviews').populate('author');
    console.log(rest)
    res.render('restr/show',{rest});
})

router.get('/:id/edit',async(req,res)=>{
    const rest = await Restr.findById(req.params.id);
    res.render('restr/edit',{rest});
})

router.put('/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const restr = await Restr.findById(id);
    if(!restr.author.equals(req.user._id)){
        req.flash('error','Not premitted')
        res.redirect(`/restr/${id}`)
    }
    const rest = await Restr.findByIdAndUpdate(id,{...req.body.restr});
    req.flash('success','Successfully edited the restraunt!')
    res.redirect(`/restr/${restr._id}`);
})

router.delete('/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    await Restr.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the restraunt!');
    res.redirect('/restr');
})

module.exports = router;