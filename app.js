const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Product = require('./model/productModel'); // Adjust the path as needed
const productRoutes = require('./routes/products'); // Adjust the path as needed

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the directory where your views are located

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/products',upload.single("imagePath"), (req, res) => {
    debugger;
    console.log(">>>>", req.file)
    const { name, price, description } = req.body;
    console.log(">>>>", req.file.path)
    const imagePath = req.file.path
    const product = new Product({name, price, description, imagePath})
    product.save()

    res.status(201).json({
        message: 'Product created successfully',
        product:product
    });
});
// Use productRoutes for handling /products endpoints
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
