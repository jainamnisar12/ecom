const Product = require('../model/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('product', { products }); // Render 'allProducts.ejs' and pass products data
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};


// Create a new product
exports.getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    
    try {
        const totalProductsCount = await Product.countDocuments();
        const products = await Product.find().skip(startIndex).limit(limit);
        res.status(200).render('product', { product: products, currentPage: page, totalProductsCount });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const { name, price, description, imagePath } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, description, imagePath },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
