

const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const {
    addToCart,
    getUserCart,
    removeFromCart,
    EmptytheCart,} = require("../controllers/cart");

const cartRouter = express.Router();



cartRouter.post('/add',authentication, authorization("user"), addToCart);

cartRouter.get('/',authentication, authorization("user"), getUserCart);

cartRouter.delete('/',authentication, authorization("user"), removeFromCart);

cartRouter.delete('/empty',authentication, authorization("user"), EmptytheCart);



module.exports = cartRouter;


