const router = require('express').Router();

// Import any controllers needed here
const { authUser, createUser, updateUser, verifyUser, deleteUser, getUser, getUsers } = require('../../controllers/user-controller');

// Declare the routes that point to the controllers above
router.route('/').post(createUser).get(getUsers);
router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').put(updateUser).delete(deleteUser).get(getUser);

module.exports = router;
