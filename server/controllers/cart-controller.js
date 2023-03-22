
const {User} = require('../models/');

async function addItemToCart(req, res) {
  const { userId } = req.params;
  const { productId, quantity, price, name, imgUrl } = req.body;
  console.log(req.body);

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
      user.cart.items.push({ productId, quantity, price, name, imgUrl });
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

async function updateCartItemsQuantities(req, res) {
  const { userId } = req.params;
  const itemsToUpdate = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    for (const itemToUpdate of itemsToUpdate) {
      const { productId, quantity } = itemToUpdate;

      const cartItemIndex = user.cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (cartItemIndex >= 0) {
        // Update the quantity of the item in the cart
        user.cart.items[cartItemIndex].quantity = quantity;
      } else {
        res.status(404).json({ message: `Item with productId: ${productId} not found in cart` });
        return;
      }
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantities in cart', error });
  }
}


async function getCart(req, res) {
  const { userId } = req.params;
  const cart = await User.findById(userId).select('cart');
  console.log(cart);
  res.status(200).json(cart);
}



module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateCartItemsQuantities,
  getCart,
};
