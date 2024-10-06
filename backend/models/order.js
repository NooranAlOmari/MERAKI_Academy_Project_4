const mongoose = require("mongoose");

  const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number, 
            required: true,
        },
    }],

    isPaid: {
        type: Boolean,
        default: false,
    },

    paidAt: {
        type: Date,
    },

    isDelivered: {
        type: Boolean,
        default: false,
    },

    deliveredAt: {
        type: Date,
    }
});




  module.exports = mongoose.model("Order", orderSchema);
