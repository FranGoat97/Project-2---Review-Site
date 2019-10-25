const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

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

router.get('/new', (req, res) => {
    res.render('users/new.ejs')
});

























module.exports = router;