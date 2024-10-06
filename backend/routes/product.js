const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const { 
    createProduct,
    getAllProducts,
    getProductById ,
    updateProductById,
    deleteProductById,
    } = require("../controllers/product");

const productRouter = express.Router();



productRouter.post("/",authentication, authorization("admin"),createProduct);
productRouter.get("/",authentication, getAllProducts);
productRouter.get("/:id",authentication, getProductById);
productRouter.put("/:id",authentication, authorization("admin"), updateProductById);
productRouter.delete("/:id",authentication, authorization("admin"),  deleteProductById);


module.exports = productRouter;
