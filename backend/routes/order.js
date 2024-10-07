const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");



const { 
    createOrder,
    getUserOrders,
    getOrderById} = require("../controllers/order");

const ordertRouter = express.Router();


ordertRouter.post('/',authentication, authorization("user"), createOrder);

ordertRouter.get('/',authentication, authorization("user"), getUserOrders);

ordertRouter.get('/:id',authentication, authorization("user"), getOrderById);


module.exports = ordertRouter;

