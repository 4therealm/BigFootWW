// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');

const createOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { products } = req.body;

    // Create a new order
    const newOrder = new Order({
      user: userId,
      products: products,
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Add the order to the user's orders array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { orders: savedOrder._id } },
      { new: true }
    );

    // Clear the user's cart
    await User.findByIdAndUpdate(
      userId,
      { $set: { 'cart.items': [] } },
      { new: true }
    );

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};
// Add more functions here for updating or deleting orders if needed
