// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

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

router.get('/verifyP', async (req, res) => {
  try {
    const { phone, password } = req.query;

    const user = await User.findOne({ phone: phone, password: password });
    if (!user || user.length === 0) {
      res.status(400).send({ error: 'User not found' });
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
      res.status(400).send({ error: 'User not found' });
    }
    res.status(200).json(user);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.get('/cart', async (req, res) => {
  try {
    const { id } = req.query;

    const userCart = await User.findOne({ _id: id }).select('cart');
    if (!userCart || userCart.length === 0)
      return res.status(400).send('Cart is empty');

    res.status(200).json(userCart);
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})
router.put('/cart', async (req, res) => {
  try {
    const { userid } = req.query;
    const { productid, quantity } = req.body;

    const user = await User.findOne({ _id: userid });
    const product = await Product.findOne({ _id: productid });

    if (!user)
      return res.status(400).send('no user found');
    else {
      if (!user.cart) {
        user.cart = [];
      }
      const itemIndex = user.cart.findIndex(i =>
        i.productid.toString() === productid); //findindex to get index, otherwise find
      //i for each element i, i returns index or if not avaialble then undefined
      //to string because warna prdouctid is an object, so for comparsion converting to string is imp

      if (itemIndex !== -1) { //if not found
        if ((user.cart[itemIndex].quantity + quantity) <= product.stock) {

          user.cart[itemIndex].quantity += quantity;
          product.stock -= quantity;
        }
        else {
          return res.status(400).send('Out of stock');
        }
      }
      else {
        user.cart.push({ productid, quantity });
      }
      await user.save();
      res.status(200).json(user);
    }
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.delete('/delete-from-cart', async (req, res) => {
  try {
    const { userid } = req.query;
    const { productid, quantity } = req.body;

    const user = await User.findOne({ _id: userid });
    const product = await Product.findOne({ _id: productid });

    if (!user)
      return res.status(400).send('no user found');
    else {
      if (!user.cart) {
        user.cart = [];
      }
      const itemIndex = user.cart.findIndex(i =>
        i.productid.toString() === productid);

      user.cart.splice(itemIndex, 1); //means “remove 1 item starting from that index”
      product.stock += quantity;

      await user.save();
      await product.save();
      res.status(200).json(user);
    }
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.put('/add-cart', async (req, res) => {
  try {
    const { userid } = req.query;
    const { productid } = req.body;

    const user = await User.findOne({ _id: userid });
    const product = await Product.findOne({ _id: productid });

    if (!user)
      return res.status(400).send('no user found');
    else {
      if (!user.cart) {
        user.cart = [];
      }
      const itemIndex = user.cart.findIndex(i =>
        i.productid.toString() === productid);

      if ((user.cart[itemIndex].quantity + 1) <= product.stock) {

        user.cart[itemIndex].quantity += 1;
        product.stock -= 1;
      }
      else {
        return res.status(400).send('Out of stock');
      }

      await user.save();
      await product.save();

      res.status(200).json(user);
    }
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.put('/remove-cart', async (req, res) => {
  try {
    const { userid } = req.query;
    const { productid } = req.body;

    const user = await User.findOne({ _id: userid });
    const product = await Product.findOne({ _id: productid });

    if (!user)
      return res.status(400).send('no user found');
    else {
      if (!user.cart) {
        user.cart = [];
      }
      const itemIndex = user.cart.findIndex(i =>
        i.productid.toString() === productid);

      if (user.cart[itemIndex].quantity > 1) {
        user.cart[itemIndex].quantity -= 1;
        product.stock += 1;

        await user.save();
        await product.save();
        res.status(200).json(user);

      } else {
        return res.status(400).send('Cannot reduce quantity below 1');

      }
    }
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
})

router.delete('/empty-cart', async (req, res) => {
  try {
    const { userid } = req.query;
    const user = await User.findOne({ _id: userid });
    //find returns an array, findOne returns a single object

    if (!user)
      return res.status(400).send('no user found');

    else {
      user.cart = [];
      await user.save();
      res.status(200).json(user);
    }
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
