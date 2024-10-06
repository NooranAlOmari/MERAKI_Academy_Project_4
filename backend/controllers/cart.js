const cartModel = require('../models/cart');

// Add product to cart
const addToCart = async (req, res) => {
    console.log(req.token)
    const { product, quantity } = req.body;
    try {
        let cart = await cartModel.findOne({ user: req.token.userId });
        if (!cart) {
            cart = new cartModel({
                user: req.token.userId ,
                items: [{ product: product, quantity:quantity }] });
        } 
        else {
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === product);
            if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
            } 
            else {
            cart.items.push({ product: product, quantity:quantity });
            }
        }
        await cart.save();
        res.status(200).json({ success: true, message: 'Item added to cart', cart });
    } 
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { addToCart };
/**else {
      
      let itemFound = false;
      
      for (let item of cart.items) {
        if (item.product.toString() === productId) {
          item.quantity += quantity; 
          itemFound = true;
          break; 
        }
      }
       */