const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');
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

















app.listen(3000, () => {
    console.log('server is running on port: 3000')
})