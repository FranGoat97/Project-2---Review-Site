const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Review = require('../models/review.js');
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

router.get('/:id', (req, res) => {

  User.findById(req.params.id)
  .populate({path: 'reviews'})
  .exec((err, foundUser) => {
    if(err){
      res.send(err);
    } else {
        console.log(foundUser);
        console.log(foundUser.reviews);
      res.render('users/show.ejs', {
        
        user: foundUser, 
        reviews: foundUser.reviews

      });
    }
  })

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
    console.log(user)

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