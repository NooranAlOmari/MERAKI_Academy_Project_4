const reviewModel = require('../models/review');

// Add a product review
const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.token.userId;

        const newReview = new reviewModel({
            product: productId,
            user: userId,
            rating,
            comment,
        });

        await newReview.save();
        res.status(201).json({ success: true, review: newReview });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get reviews of a specific product By ID of product
const getProductReviewsById = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await reviewModel.find({ product: productId }).populate('user', 'firstName lastName');

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




module.exports = { 
    addReview,
    getProductReviewsById,
    };
