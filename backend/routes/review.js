const express = require("express");
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization");

const{ 
    addReview,
    getProductReviewsById,
    deleteReviewById,} = require("../controllers/review");

const reviewRouter = express.Router();



reviewRouter.post("/",authentication, authorization(["user","admin"]),addReview);

reviewRouter.get("/:id",authentication, authorization(["user","admin"]),getProductReviewsById);

reviewRouter.delete("/:id",authentication, authorization(["admin"]),deleteReviewById);

module.exports = reviewRouter;
