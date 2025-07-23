const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    DOB: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String, //as a number we loose inital 0s
        required: true,
        unique: true,
        match: [/^\d{11}$/, 'Phone number must be 11 digits']
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

module.exports = mongoose.model('User', userSchema);