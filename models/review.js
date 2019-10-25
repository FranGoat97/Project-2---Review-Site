const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    subject: {type: String, require: true},
    rating: {type: String, require: true},
    body: {type: String}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
