const mongoose = require('mongoose');

//MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/db2", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connection successful");
    }
    catch (err) {
        console.log("MongoDB connection unsuccessful: ", err);
    }
}

module.exports = connectDB;