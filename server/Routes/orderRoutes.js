const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        console.log(newOrder);

        await newOrder.save();

        res.status(200).send(newOrder);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find(); // fetch all orders
        res.status(200).send(orders);
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
});

router.get('/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const orders = await Order.find({ userid: userid });

        res.status(200).send(orders);
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})

module.exports = router;