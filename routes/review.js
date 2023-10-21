const express = require('express');
const router = express.Router({mergeParams:true});
const Restr = require('../models/restr');
const Review = require('../models/review');

router.post('/',async(req,res)=>{
    const  restr = await Restr.findById(req.params.id);
    const review = new Review(req.body.review);
    restr.reviews.push(review);
    await review.save();
    await restr.save();
    res.redirect(`/restr/${restr._id}`);
})

router.delete('/:reviewId',async(req,res)=>{
    const {id,reviewId} = req.params;
    await Restr.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(req.params.reviewID);
    res.redirect(`/restr/${id}`);
})

module.exports = router;