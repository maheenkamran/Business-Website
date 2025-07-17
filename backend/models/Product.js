const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default:0,
        min:[0,'Price cannot be negative']
    },
    image: {
        type: String, //url
        default:"" //in images
    },
    description: {
        type: String
    },
    category: {
        type:String,
        required: true
    },
    stock: {
        type:Number,
        required: true,
        default:1,
        min:[0,'Stock cannot be negative']
    }
});

module.exports = mongoose.model('Product',productSchema);