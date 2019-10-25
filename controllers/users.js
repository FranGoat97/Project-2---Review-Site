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

router.get('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/users');
        }
    })
})

























module.exports = router;