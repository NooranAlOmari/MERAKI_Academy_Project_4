

const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const {
    addToCart,
    getUserCart } = require("../controllers/cart");

const cartRouter = express.Router();



cartRouter.post('/add',authentication, authorization("user"), addToCart);

cartRouter.get('/',authentication, authorization("user"), getUserCart);



module.exports = cartRouter;


