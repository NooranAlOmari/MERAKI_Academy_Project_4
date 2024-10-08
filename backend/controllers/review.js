const reviewModel = require('../models/review');
const productModel = require('../models/product');

// Add a product review
const addReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.token.userId;

    try {
        const findproduct = await productModel.findById(productId);
        if (!findproduct) {
            return res.status(404).json({
            success: false,
            message: 'Product not found',
            });
        }
        const newReview = new reviewModel({
            product: productId,
            user: userId,
            rating: Number(rating),
            comment,
        });

        const savedReview=await newReview.save();

        /**/findproduct.reviews.push(newReview._id);

        /**/findproduct.numReviews = findproduct.reviews.length;
//to find The rating value of each review.
         const ratings = await Promise.all(findproduct.reviews.map(async (reviewwwId) => {
            const review = await reviewModel.findById(reviewwwId);
            return review.rating;
        }));

        
        findproduct.rating = ratings.reduce((acc, item) => acc + item, 0) / ratings.length;

        await findproduct.save();
            res.status(201).json({
            success: true,
            message: 'Review added successfully',
            review: savedReview
                    });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//findproduct.reviews = بتعطيني الريقيو ايدي حسب ما انا انشأتها 


// Get reviews of a specific product By ID of product
const getProductReviewsById = async (req, res) => {
    try {
        const productId  = req.params.id;
        const reviews = await reviewModel.find({ product: productId }).populate('user', 'firstName lastName');

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const deleteReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await reviewModel.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { 
    addReview,
    getProductReviewsById,
    deleteReviewById,
    };
