const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();

        res.status(200).send(newOrder);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})

module.exports = router;