// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    console.log("Request Body:", req.body);
    res.status(201).send(newUser);
  } catch (err) {
    console.log("error");
    res.status(400).send({ error: err.message });
  }
});

router.get('/',async(req,res)=>{
  try{
    const users= await User.find();
    res.status(200).json(users);
  }
  catch(err){
    console.log("error");
    res.status(400).send({error:err.message});
  }
})

module.exports = router;
