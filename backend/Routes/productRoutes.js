const express = require('express');
const Router = express.Router();
const Product = require("../models/Product");

Router.post('/',async(req,res)=>{
    try {
        const newProduct=new Product(req.body);
        await newProduct.save();

        console.log(req.body);
        res.status(200).send(newProduct);
    }
    catch (err) {
        console.log("error");
        res.status(400).send({ error: err.message });
    }
})

Router.get('/', async (req, res) => {
    try {
        const products=await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        console.log("error");
        res.status(400).send({ error: err.message });
    }
})

module.exports = Router;