const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");



const { 
    createOrder,
    getUserOrders,
    getOrderById} = require("../controllers/order");

const ordertRouter = express.Router();


ordertRouter.post('/',authentication, authorization(["user","admin"]), createOrder);

ordertRouter.get('/',authentication, authorization(["user","admin"]), getUserOrders);

ordertRouter.get('/:id',authentication, authorization(["user","admin"]), getOrderById);


module.exports = ordertRouter;

