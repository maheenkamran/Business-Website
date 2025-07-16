const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express());

app.get('/', (req, res) => {
    console.log("Hello from backend!");
})