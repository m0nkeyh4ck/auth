const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const uservalildation = require('../middlewares/UserValidation');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(uservalildation.checkUsername), asyncHandler(uservalildation.checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

module.exports = router;