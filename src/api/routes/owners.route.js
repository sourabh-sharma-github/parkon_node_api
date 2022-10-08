const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')
const passport = require('passport');
require('../../middleware/passport')
const auth = passport.authenticate('jwt', { session: false })
const _OV = require('../validations/owners.valdation');
const _OC = require('../controllers/owners.controller')
router.post('/signup-with-email', validate(_OV.vSignUpWithEmail), _OC.signupWithEmail);
router.post('/signup-social', validate(_OV.vSocialSignUp), _OC.socialSignUp);
router.post('/signin', validate(_OV.vSignIn), _OC.signIn);
router.post('/forgot-password', validate(_OV.vForgotPassword), _OC.forgotPassword);
router.post('/change-password', validate(_OV.vChangePassword), _OC.changePassword);
module.exports = router;