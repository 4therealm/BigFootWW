const {Schema, model} = require('mongoose');

const ItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Item = model('Item', ItemSchema);

module.exports = Item;
