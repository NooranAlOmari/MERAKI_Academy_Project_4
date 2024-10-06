

const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const { 
    addToCart,
    } = require("../controllers/cart");

const cartRouter = express.Router();



cartRouter.post('/add',authentication, authorization("user"), addToCart);



module.exports = cartRouter;


