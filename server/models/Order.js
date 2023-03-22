// Order.js
const { Schema, model } = require('mongoose');


const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      price: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model('Order', OrderSchema);
module.exports = Order;
//

