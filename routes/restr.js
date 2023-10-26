const express = require('express');
const router = express.Router({mergeParams:true});
const Restr = require('../models/restr');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware')
const restrs = require('../controllers/restr');


router.route('/')
    .get(restrs.index)
    .post(isLoggedIn,restrs.createRestr);

router.get('/new',isLoggedIn,restrs.renderNewForm);

router.route('/:id')
    .get(restrs.showRestr)
    .put(isLoggedIn,restrs.updateRestr)
    .delete(isLoggedIn,restrs.deleteRestr);

router.get('/:id/edit',restrs.renderEditForm);
module.exports = router;