const { loginController, registerUserController, logoutController } = require('../controller/authController');
const { isLoggedIn, isLogOut } = require('../middleware/authMiddlewares');

const router = require('express').Router();

module.exports = router;

router.route("/register").post(isLoggedIn, registerUserController)
router.route("/login").post(isLoggedIn,loginController)
router.route("/logout").post(isLogOut, logoutController)