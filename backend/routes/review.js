const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const{ 
    addReview,
    getProductReviewsById,} = require("../controllers/review");

const reviewRouter = express.Router();



reviewRouter.post("/",authentication, authorization(["user","admin"]),addReview);

reviewRouter.get("/:id",authentication, authorization(["user","admin"]),getProductReviewsById);

module.exports = reviewRouter;
