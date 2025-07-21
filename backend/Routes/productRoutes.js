const express = require('express');
const Router = express.Router();
const Product = require("../models/Product");

Router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        console.log(req.body);
        res.status(200).send(newProduct);
    }
    catch (err) {
        console.log("error");
        res.status(400).send({ error: err.message });
    }
})

// Router.get('/', async (req, res) => {
//     try {
//         const products=await Product.find();
//         res.status(200).json(products);
//     }
//     catch (err) {
//         console.log("error");
//         res.status(400).send({ error: err.message });
//     }
// })

Router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        //This is using JavaScript object destructuring to extract a specific value from the req.query object.
        //now you can directly use the variable category in your code instead of writing req.query.category.
        //console.log(category);

        const products = await Product.find({ category });
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
})
Router.get('/price', async (req, res) => {
    try {
        const { category, min, max } = req.query;

        const products = await Product.find({
            category: category,
            price: { $gte: Number(min), $lte: Number(max) }
        });
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
})
Router.get('/details', async (req, res) => {
    try {
        const { id } = req.query;
        const productDetail = await Product.find({ _id: id });
        res.status(200).json(productDetail);

    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
})
module.exports = Router;