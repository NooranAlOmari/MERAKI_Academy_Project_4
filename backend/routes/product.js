const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const { 
    createProduct,
    getAllProducts,
    getProductById ,
    updateProductById,
    deleteProductById,
    searchProducts,
    getProductsByCategory
    } = require("../controllers/product");

const productRouter = express.Router();



productRouter.post("/",authentication, authorization(["admin"]),createProduct);

productRouter.get("/",authentication, getAllProducts);

productRouter.get("/:categoryId", getProductsByCategory);

productRouter.get("/details/:productId", getProductById);

productRouter.put("/:id",authentication, authorization(["admin"]), updateProductById);

productRouter.delete("/:id",authentication, authorization(["admin" , "user"]),  deleteProductById);



productRouter.get('/search/:name', searchProducts)

module.exports = productRouter;


/**
 * productRouter.get("/:categoryId"getProductsByCategory);

productRouter.get("/:productId", getProductById);
 */