const cartModel = require('../models/cart');
const productModel = require("../models/product")

// Add product to cart
const addToCart = async (req, res) => {
    console.log(req.token)
    const { product, quantity } = req.body;
    try {
        /**/const productDetails = await productModel.findById(product)/**/
        let cart = await cartModel.findOne({ user: req.token.userId }).populate('items.product');
        if (!cart) {
            cart = new cartModel({
                user: req.token.userId ,
                items: [{ product: product,//objId
                        quantity:quantity,
                        price: productDetails.price}]
                });
        } 
        else {
            const itemIndex = cart.items.findIndex((item) => item.product._id.toString() === product.toString());
            if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
            } 
            else {
            cart.items.push({ product: product,
                            quantity:quantity,
                            price: productDetails.price });
            }
        }
        await cart.save();
        res.status(200).json({ success: true, message: 'Item added to cart', cart });
    } 
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// Get user cart
const getUserCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.token.userId }).populate('items.product');
            res.status(200).json({ success: true, cart });
    }
    catch (err) {
            res.status(500).json({ success: false, message: err.message });
    }
}

//update Cart Quantity
const updateCartQuantity = async (req, res) => {
    const { product, quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    try {
        const cart = await cartModel.findOne({ user: req.token.userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex((item) => item.product._id.toString() === product);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity; // Update quantity
        } else {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// Remove a product from the cart
const removeFromCart = async (req, res) => {
    const { product } = req.body;
    try {
        const cart = await cartModel.findOne({ user: req.token.userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => !item.product.equals(product))
        await cart.save();

        res.status(200).json({ success: true, cart, deleted:product});/****/
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Empty the Cart
const EmptytheCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.token.userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        
        cart.items = [];
        await cart.save();
        
        res.status(200).json({ success: true, message: 'Cart Empty ' });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    addToCart,
    getUserCart,
    removeFromCart,
    EmptytheCart,
    updateCartQuantity
};




    /*item.product!==productId ****false
    !item.product.equals(productId) ****true
    */


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