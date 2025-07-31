// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
})

module.exports = router;
