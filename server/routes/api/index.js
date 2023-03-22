const router = require('express').Router();
const userRoutes = require('./user-routes');
const categoryRoutes = require('./category-routes');
const cartRoutes = require('./cart-routes');
const productRoutes = require('./product-routes');


router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/product', productRoutes);

module.exports = router;
