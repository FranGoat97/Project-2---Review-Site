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
<<<<<<< HEAD
    
        User.findOne({username: req.session.username}, (err, foundUser) => {

            // console.log(user);

=======
    console.log(req.session);
    User.findOne({username: req.session.username}, (err, foundUser) => {
        if (err) {
            
            res.send (err);
            
        } else {
>>>>>>> master
            Review.create(req.body, (err, createdReview) => {
                if (err) {
                    res.send(err);
                } else {
                    foundUser.reviews.push(createdReview);
                    foundUser.save((err, returnedData) => {
                        res.redirect('/users/' + foundUser._id)
                    })
                }
            })
<<<<<<< HEAD
        })
    
=======
        }
    })
>>>>>>> master
})
// working

// edit route

<<<<<<< HEAD
router.get('/:id/edit', async (req, res) => {
    
    try {
    const allUsers = await User.find({})

    const foundReviewUser = await User.findOne({'reviews': req.params.id})
                            .populate({path: 'reviews', match: {_id: req.params.id}})
                            .exec()

   
    
            res.render('/edit.ejs', {
                users: allUsers,
                review: foundReviewUser.reviews[0],
                reviewUser: foundReviewUser
=======
router.get('/:id', (req, res) => {
    Review.findById(req.params.id, (err, foundReview) => {
        if (err) {
            res.send(err);
        } else {
            console.log('SOMETHING');
            console.log(foundReview);
            res.render('reviews/show.ejs', {
                review: foundReview
>>>>>>> master
            });
    } catch(err){
        res.send(err);
    }

});

router.delete('/:id', async (req, res)=>{
  // when we delete an article, we want to remove that
  // article from the authors array
  console.log('delete')
  try {
    // delete the article
    const deleteReview = Review.findByIdAndRemove(req.params.id);
    // find the author the article belongs too
    // so we can remove the article from their array
    const findUser = User.findOne({'reviews': req.params.id});

    // Using promise all just as we did above
    const [deletedReviewResponse, foundUser] = await Promise.all([deleteReview, findUser]);
    console.log(foundUser, ' found user')
    // here we are using mongooses method remove
    // to remove the article by its id
    // we are mutating the array
    foundUser.reviews.remove(req.params.id);
    // if we mutate the array we have to save it
    await foundUser.save()
    // now we can send a response back to the client
    // the browser
    console.log('after save')
    res.redirect('/reviews')
  } catch(err){
    console.log(err)
    res.send(err);
  }
});
























module.exports = router;