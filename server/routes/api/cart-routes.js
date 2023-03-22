
const router = require('express').Router();


const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCart
} = require('../../controllers/cart-controller');

router
  .route('/:userId/cart')
  .get(getCart);
  
router
  .route('/:userId/cart/add')
  .post(addItemToCart);

router
  .route('/:userId/cart/remove/:productId')
  .delete(removeItemFromCart);

router
  .route('/:userId/cart/update/:productId')
  .put(updateCartItemQuantity);


module.exports = router;