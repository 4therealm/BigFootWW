const router = require('express').Router();
const userRoutes = require('./user-routes');
const categoryRoutes = require('./category-routes');
const cartRoutes = require('./cart-routes');


router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
