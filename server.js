const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');

app.set('view engine', 'ejs');
app.use(session({
    secret: "secret string",
    resave: false, 
    saveUninitialized: false 
  }));
const userController = require('./controllers/users.js');
const reviewController = require('./controllers/reviews.js');
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', userController);
app.use('/reviews', reviewController);

app.get('/', (req, res) => {
<<<<<<< HEAD
    console.log(req.session, 'home page');
    res.render('index.ejs')
=======
    res.render('index.ejs', {
    	message: req.session.message
    })
>>>>>>> master
});

app.get('/logout', (req, res) => {

  // creates a brand new cookie, without any of our properties
  // that we previously added to it
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  })

})


















app.listen(3000, () => {
    console.log('server is running on port: 3000')
})