const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");



const { 
    createOrder,} = require("../controllers/order");

const ordertRouter = express.Router();


ordertRouter.post('/create',authentication, authorization("user"), createOrder);



module.exports = ordertRouter;

