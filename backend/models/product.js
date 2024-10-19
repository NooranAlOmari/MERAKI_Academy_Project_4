const mongoose = require("mongoose");

  const productSchema = new mongoose.Schema({

    name: { type: String,  required: true,},

    description: {type: String, required: true,},

    price: {type: Number, required: true,},

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'},

    image: {type: String,required: true,},

    rating: {
      type: String,
      required: true,
      
      
  },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],

    numReviews: {type: Number,default: 0,},
    calories: { type: Number, required: true }
});




  module.exports = mongoose.model("Product", productSchema);


  /**rating: {
      /*type: Number,*/ 
      //required: true,
      /*min: 1, 
      max: 5,*/ 