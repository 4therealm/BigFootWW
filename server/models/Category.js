const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});
const Category = model('Category', CategorySchema);

module.exports = Category;