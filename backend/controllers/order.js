const orderModel = require('../models/order');
const cartModel = require('../models/cart');


//Create a new Orde
const createOrder = async (req, res) => {
    const userId = req.token.userId
    try {
        const cart = await cartModel.findOne({ user: userId })
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        const newOrder = new orderModel({
            user: userId,
            orderItems: cart.items,
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
//shippingAddress, paymentMethod

//Get all order for the user by user id (token)
const getUserOrders = async (req, res) => {
    const userId = req.token.userId
    try{
        const order = await orderModel.find({ user: userId }).populate('orderItems.product');
        
        return res.status(200).json({ success: true, order: order });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
}


//Get specific order for the user by id of order(params)
const getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await orderModel.findById(orderId).populate('orderItems.product')

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = { 
    createOrder,
    getUserOrders,
    getOrderById
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

