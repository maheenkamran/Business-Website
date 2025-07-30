const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes.js');
const orderRoutes = require('./Routes/orderRoutes.js');
const reviewRoutes = require('./Routes/reviewRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

//For anything starting with /api/users, go to userRoutes file to figure out what to do next.
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send("Hello from backend!");
})

app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})