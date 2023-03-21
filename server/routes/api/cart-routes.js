const router = require('express').Router();


const { addItemToCart} = require('../../controllers/cart-controller');

router.route('/:id').post(addItemToCart);


module.exports = router;
