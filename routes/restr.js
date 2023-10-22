const express = require('express');
const router = express.Router({mergeParams:true});
const Restr = require('../models/restr');
const Review = require('../models/review');

router.get('/',async(req,res)=>{
    const rests = await Restr.find({});
    res.render('restr/index',{rests})
})
router.get('/new',(req,res)=>{
    res.render('restr/new');
})

router.post('/',async(req,res)=>{
    const restr = new Restr(req.body.restr);
    await restr.save();
    req.flash('success','Successfully made a new review!')
    res.redirect(`/restr/${restr._id}`);
})

router.get('/:id',async(req,res)=>{
    const rest = await Restr.findById(req.params.id).populate('reviews');
    res.render('restr/show',{rest});
})

router.get('/:id/edit',async(req,res)=>{
    const rest = await Restr.findById(req.params.id);
    res.render('restr/edit',{rest});
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const restr = await Restr.findByIdAndUpdate(id,{...req.body.restr});
    req.flash('success','Successfully edited the restraunt!')
    res.redirect(`/restr/${restr._id}`);
})

router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    await Restr.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the restraunt!');
    res.redirect('/restr');
})

module.exports = router;