const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");



const { 
    addCategory,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById,
    } = require("../controllers/category");

const categoryRouter = express.Router();


categoryRouter.post('/',authentication, authorization(["admin"]), addCategory);

categoryRouter.get('/',authentication, authorization(["user","admin"]), getAllCategories);

categoryRouter.put('/:id',authentication, authorization(["admin"]), updateCategoryById);

categoryRouter.delete('/:id',authentication, authorization(["user","admin"]), deleteCategoryById);




module.exports = categoryRouter;
