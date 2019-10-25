const express = require('express');
const router = express.Router();
const Review = require('../models/review.js');
const User = require('../models/user.js');

router.get('/', (req, res) => {
    Review.find({}, (err, allReviews) => {
        if (err) {
            res.send(err);
        } else {
            res.render('reviews/index.ejs', {
                reviews: allReviews
            });
        }
    })
});

router.get ('/new', (req, res) => {
    res.render('reviews/new.ejs')
});




























module.exports = router;