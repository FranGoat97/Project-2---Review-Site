const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;