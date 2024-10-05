const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const { 
    createProduct,
    getAllProducts,
    getProductById,
    
    } = require("../controllers/product");

const productRouter = express.Router();



productRouter.post("/",authentication, authorization("admin"),createProduct);

productRouter.get("/",authentication, getAllProducts);

productRouter.get("/:id",authentication, getProductById);

module.exports = productRouter;
