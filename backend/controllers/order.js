const orderModel = require('../models/order');
const cartModel = require('../models/cart');

const createOrder = async (req, res) => {
    const userId = req.token.userId
    try {
        const cart = await cartModel.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        const newOrder = new orderModel({
            user: userId,
            items: cart.items,
            totalAmount: cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
            status: 'Pending',
        });

        await newOrder.save();
        await cartModel.deleteOne({ user: userId }); 

        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    createOrder,
    }

/**
 * ***totalAmount:***
 *  *using reduce*
 *  cart.items :array
 *  item :one product عنصر من المصفوفة بمثل منتج واحد
 *  item.product.price :  سعر المنتج
 *  item.quantity : الكمية
 * total = 0 : القيمة الي ببدأ منها
*/