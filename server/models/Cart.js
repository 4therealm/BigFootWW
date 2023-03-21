const {Schema, model} = require('mongoose');


const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

const Cart = model('Cart', CartSchema);

module.exports = Cart;
