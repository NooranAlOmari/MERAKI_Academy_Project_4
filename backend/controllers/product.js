const productModel = require('../models/product');

// Create a new product (Just For ADMIN)
const createProduct  = (req, res) => {
    const { 
        name, description, price,
        category, image } = req.body;

    const newproduct = new productModel({    
        name,description, price, 
        category, image });

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
        const products = await productModel.find()//.populate('category');
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
    const productId = req.params.id;

    try {
        const product = await productModel.findById(productId)//.populate('category');
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


module.exports = { createProduct ,getAllProducts,
getProductById ,
getProductById,
};
