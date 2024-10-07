const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const{ 
    addReview,
    } = require("../controllers/review");

const reviewRouter = express.Router();



reviewRouter.post("/",authentication, authorization(["user","admin"]),addReview);


module.exports = reviewRouter;
