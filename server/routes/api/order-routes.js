const router = require('express').Router();

const {
  createOrder,
  getOrdersByUser
} = require('../../controllers/order-controllers');

router
  .route('/checkout/:userId')
  .post(createOrder);

  router
  .route('/:userId')
  .get(getOrdersByUser);

module.exports = router;


  