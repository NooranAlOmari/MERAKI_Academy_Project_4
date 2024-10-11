const productModel = require('../models/product');

// Create a new product (Just For ADMIN)
const createProduct  = (req, res) => {
    const { 
        name, description, price,
        category,rating, image } = req.body;

    const newproduct = new productModel({    
        name,description, price, 
        category,rating, image });

    newproduct.save()
    .then((result) => {
        res.status(201).json({
        success: true,
        message: `Product created`,
        Product: result,
        });
    })
    .catch((err) => {
        res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
        });
    });
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate('category');
            res.status(200).json({ 
            success: true,
            products:products });
    }
    catch (err) {
            res.status(500).json({
            success: false, 
            message: err.message });
    }
};

// Get products for specific category By categoryId
const getProductsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const products = await productModel.find({category: categoryId }).populate('category');
            if (!products) return res.status(404).json({
                success: false,
                message: 'Products for this category not found' });

            res.status(200).json({
                success: true,
                products:products });
    } 
    catch (err) {
            res.status(500).json({
                success: false,
                message: err.message });
    }
};


// Get a specific product By Id
const getProductById = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await productModel.findById(productId).populate('category');
            if (!product) return res.status(404).json({
                success: false,
                message: 'Product not found' });

            res.status(200).json({
                success: true,
                product:product });
    } 
    catch (err) {
            res.status(500).json({
                success: false,
                message: err.message });
    }
};


const updateProductById = async (req, res) => {
    const productId = req.params.id;
    const updates = req.body;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updates, { new: true });
        res.status(200).json({
                success: true,
                message: 'Product updated',
                product: updatedProduct });
    } 
    catch (err) {
        res.status(500).json({ 
                success: false,
                message: err.message });
    }
};


const deleteProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        await productModel.findByIdAndDelete(productId);
        res.status(200).json({ 
            success: true,
            message: 'Product deleted' });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message });
    }
};


const searchProducts = async (req, res) => {
    const { name } = req.params; 

    try {
        
        const products = await productModel.find();

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(name.toLowerCase())
        );

        res.status(200).json({ success: true, products: filteredProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { 
createProduct,
getAllProducts,
getProductById ,
updateProductById,
deleteProductById,
searchProducts,
getProductsByCategory
};
