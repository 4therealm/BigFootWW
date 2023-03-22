const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  imageUrl: {
    type: String
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },

});

const Product = model('Product', ProductSchema);
module.exports = Product

