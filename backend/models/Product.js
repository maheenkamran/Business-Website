const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String, //url
        default: "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" //in images
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1,
        min: [0, 'Stock cannot be negative']
    }
});

module.exports = mongoose.model('Product', productSchema);