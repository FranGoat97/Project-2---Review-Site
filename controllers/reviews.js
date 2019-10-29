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

router.post('/', (req, res) => {
    // need to create a new review
    // need to use the Review model
    // after the review is created, 
    // it needs to be pushed into the 
    // User's reviews array
    // the find user function needs to be req.body
    // because it is using the contents of the form
    if (req.session.logged === true) {
        User.findOne({username: req.session.username}, (err, foundUser) => {
            Review.create(req.body, (err, createdReview) => {
                if (err) {
                    res.send(err);
                } else {
                    foundUser.reviews.push(createdReview);
                    foundUser.save((err, returnedData) => {
                        res.redirect('/reviews')
                    })
                }
            })
        })
    }
})

router.get('/:id', (req, res) => {
    User.findOne({'reviews': req.params.id})
    .populate({path: 'reviews', match: {_id: req.params.id}})
    .exec((err, foundReview) => {
        if (err) {
            res.send(err);
        } else {
            res.render('reviews/show.ejs', {
                user: foundUser,
                review: foundUser.reviews[0]
            });
        }
    })
});


























module.exports = router;