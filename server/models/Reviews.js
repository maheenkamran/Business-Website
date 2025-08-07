const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewtext: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

reviewSchema.index({ userid: 1, productid: 1 }, { unique: true });
//no combination of user and product can be repeated for a review, we create a compound index

module.exports = mongoose.model('Review', reviewSchema);