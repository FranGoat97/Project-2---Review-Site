const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if (err) {
            res.send(err);
        } else {
            res.render('users/index.ejs', {
                users: allUsers
            });
        }
    })
});

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
});

router.get('/registration', (req,res)=>{
    res.render('users/register.ejs')
})

//show route
router.get('/:id', async(req, res) => {
  
try {

  const foundUser= await User.findById(req.params.id).populate('reviews').exec()
  


      res.render('users/show.ejs', {
        user: foundUser
      });
  }  catch (err)
    {res.send(err)}

});


// delete one review?

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

// password encrypt

router.post('/registration', (req, res, next) => {

  // first we are going to hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // lets create a object for our db entry;
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash

  // lets put the password into the database
  User.create(userDbEntry, (err, user) => {
    console.log(req.session, req.body)

    // lets set up the session in here we can use the same code we created in the login
    req.session.username = user.username;
    req.session.logged   = true;
    res.redirect('/users/' + user._id)
  });

})

router.post('/login', (req, res, next) => {

  User.findOne({username: req.body.username}, (err, user) => {
        console.log(user);
      if(user){
                     //now compare hash with the password from the form
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.message  = '';
                req.session.username = req.body.username;
                req.session.logged   = true;
                nowUser = user._id
                console.log(req.session, req.body)

                res.redirect('/users/' + user._id)
            } else {
              console.log('else in bcrypt compare')
              req.session.message = 'Username or password are incorrect';
              res.redirect('/')

            }

      } else {

          req.session.message = 'Username or password are incorrect';
          res.redirect('/')

      } 
  });

})


















module.exports = router;