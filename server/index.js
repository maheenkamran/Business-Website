const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/requests", requestRoutes);

app.get('/', (req, res) => {
    res.send("Hello from backend!");
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})
