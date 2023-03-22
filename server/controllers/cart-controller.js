
const {User} = require('../models/');

async function addItemToCart(req, res) {
  const { userId } = req.params;
  const { productId, quantity, price, name } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex >= 0) {
      // Update the quantity of the existing item in the cart
      user.cart.items[cartItemIndex].quantity += quantity;
    } else {
      // Add a new item to the cart
      user.cart.items.push({ productId, quantity, price, name });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
}



async function removeItemFromCart(req, res) {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart.items = user.cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
}

async function updateCartItemQuantity(req, res) {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex >= 0) {
      // Update the quantity of the item in the cart
      user.cart.items[cartItemIndex].quantity = quantity;
      await user.save();
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantity in cart', error });
  }
}

async function getCart(req, res) {
  const { userId } = req.params;
  const cart = await User.findById(userId).select('cart');
  res.status(200).json(cart);
}



module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCart,
};
