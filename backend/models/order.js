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
    totalAmount: { 
        type: Number, 
        required: true 
    },
    paymentMethod: {
        type: String,
        enum: ['paypal', 'Credit Card', 'Cash'],
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    shippingAddress: {
        fullAddress: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: { type: Number, required: true }, // حقل خط العرض
            longitude: { type: Number, required: true } // حقل خط الطول
        }
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
    },
    note: { 
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
