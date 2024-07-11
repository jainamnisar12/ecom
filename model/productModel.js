const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, data: Buffer }  // imagePath may not always be required
});

module.exports = mongoose.model('Product', productSchema);