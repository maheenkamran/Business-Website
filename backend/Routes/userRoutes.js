// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).send(newUser);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.get('/verifyP', async (req, res) => {
  try {
    const { phone, password } = req.query;

    const user = await User.findOne({ phone: phone, password: password });
    if (!user || user.length === 0) {
      res.status(400).send({ error: err.message });
    }
    res.status(200).json(user);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})
router.get('/verifyE', async (req, res) => {
  try {
    const { email, password } = req.query;

    const user = await User.findOne({ email: email, password: password });
    if (!user || user.length === 0) {
      res.status(400).send({ error: err.message });
    }
    res.status(200).json(user);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})
router.get('/:userid', async (req, res) => {
  try {
    const { userid } = req.params;

    const user = await User.find({ _id: userid });
    if (!user) res.status(400).send('User not found.');
    res.status(200).json(user);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

module.exports = router;
