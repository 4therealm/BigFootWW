const Cart = require('../models/Cart');
const Item = require('../models/Item');
const User = require('../models/User');
const Product = require('../models/Product');
module.exports = {

  

  async addItemToCart(req, res) {
    const { userId, productId, quantity } = req.body;
  
    try {
      const user = await User.findById(userId).populate('cart');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const newItem = await Item.create({ product: productId, quantity });
  
      if (!user.cart) {
        const newCart = await Cart.create({ user: userId, items: [newItem] });
        user.cart = newCart;
        await user.save();
      } else {
        user.cart.items.push(newItem);
        await user.cart.save();
      }
  
      res.status(201).json({ message: 'Item added to cart', item: newItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding item to cart' });
    }
  },
};

