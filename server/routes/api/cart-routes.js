
const router = require('express').Router();


const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCart
} = require('../../controllers/cart-controller');

router
  .route('/:userId')
  .get(getCart);
  
router
  .route('/:userId/add')
  .post(addItemToCart);

router
  .route('/:userId/remove/:productId')
  .delete(removeItemFromCart);

router
  .route('/:userId/update/:productId')
  .put(updateCartItemQuantity);


module.exports = router;