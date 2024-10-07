const categoryModel = require('../models/category');

// Add new category
const addCategory = async (req, res) => {
    const { name, description, image } = req.body;
    try {
        const newCategory = new categoryModel({ name, description, image });
        
        await newCategory.save();
        res.status(201).json({
                success: true,
                message: 'Category created successfully',
                category: newCategory });
    } 
    catch (error) {
        res.status(500).json({ 
                success: false,
                message: error.message });
    }
};


const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
                success: true,
                categories });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateCategoryById  = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedcategory = await categoryModel.findByIdAndUpdate(id, updates, { new: true });
        
        res.status(200).json({
                success: true,
                message: 'Category updated',
                Category: updatedcategory });
    } 
    catch (err) {
        res.status(500).json({ 
                success: false,
                message: err.message });
    }
};


const deleteCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await categoryModel.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { 
    addCategory,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById,
    }





