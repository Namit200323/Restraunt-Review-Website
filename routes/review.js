const express = require('express');
const router = express.Router({mergeParams:true});
const Restr = require('../models/restr');
const Review = require('../models/review');
const reviews = require('../controllers/review');
const review = require('../models/review');

router.post('/',reviews.createReview);

router.delete('/:reviewId',reviews.deleteReview);

module.exports = router;