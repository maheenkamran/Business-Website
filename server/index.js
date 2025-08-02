// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./db.js");
// const userRoutes = require('./Routes/userRoutes');
// const productRoutes = require('./Routes/productRoutes.js');
// const orderRoutes = require('./Routes/orderRoutes.js');
// const reviewRoutes = require('./Routes/reviewRoutes.js');
// const adminRoutes = require('./Routes/adminRoutes.js');

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// //For anything starting with /api/users, go to userRoutes file to figure out what to do next.
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/admin', adminRoutes);

// app.get('/', (req, res) => {
//     res.send("Hello from backend!");
// })

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// })



const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes.js');
const orderRoutes = require('./Routes/orderRoutes.js');
const reviewRoutes = require('./Routes/reviewRoutes.js');
const adminRoutes = require('./Routes/adminRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

//For anything starting with /api/users, go to userRoutes file to figure out what to do next.
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send("Hello from backend!");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});