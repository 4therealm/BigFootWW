const router = require('express').Router();
const userRoutes = require('./user-routes');

const cartRoutes = require('./cart-routes');


router.use('/user', userRoutes);

router.use('/cart', cartRoutes);

module.exports = router;
