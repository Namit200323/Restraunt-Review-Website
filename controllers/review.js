const Restr = require('../models/restr');
const Review = require('../models/review');

module.exports.createReview = async(req,res)=>{
    const  restr = await Restr.findById(req.params.id);
    const review = new Review(req.body.review);
    restr.reviews.push(review);
    await review.save();
    await restr.save();
    req.flash('success','Successfully made a new review!')
    res.redirect(`/restr/${restr._id}`);
}

module.exports.deleteReview = async(req,res)=>{
    const {id,reviewId} = req.params;
    await Restr.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(req.params.reviewID);
    req.flash('success','Successfully deleted the review!')
    res.redirect(`/restr/${id}`);
}