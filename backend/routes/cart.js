

const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const {
    addToCart,
    getUserCart,
    removeFromCart,
    EmptytheCart,
    updateCartQuantity} = require("../controllers/cart");

const cartRouter = express.Router();



cartRouter.post('/add',authentication, authorization(["user","admin"]), addToCart);

cartRouter.get('/',authentication, authorization(["user","admin"]), getUserCart);

cartRouter.put('/updateQuantity', authentication, authorization(["user","admin"]), updateCartQuantity);


cartRouter.delete('/',authentication, authorization(["user"]), removeFromCart);

cartRouter.delete('/empty',authentication, authorization(["user"]), EmptytheCart);



module.exports = cartRouter;


