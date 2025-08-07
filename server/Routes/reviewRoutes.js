const express = require('express');
const router = express.Router();
const Product = require("../models/Reviews");
const Reviews = require('../models/Reviews');

router.post('/', async (req, res) => {
    try {
        const newReview = new Reviews(req.body);
        await newReview.save();

        res.status(200).send(newReview);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const { productid } = req.query;
        const review = await Reviews.find({ productid: productid });

        res.status(200).send(review);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})
router.get('/user', async (req, res) => {
    try {
        const { userid } = req.query;
        const review = await Reviews.find({ userid: userid });

        res.status(200).send(review);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})
module.exports = router;
