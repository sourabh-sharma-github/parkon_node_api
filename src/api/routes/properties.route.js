const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')
const passport = require('passport');
require('../../middleware/passport')
const auth = passport.authenticate('jwt', { session: false })
const _PV = require('../validations/properties.validation');
const _PC = require('../controllers/properties.controller');

router.post('/add-property', auth, validate(_PV.vAddProperty), _PC.addProperty);
// router.post('/signup-social', validate(_UV.vSocialSignUp), _UC.socialSignUp);
// router.post('/signin', validate(_UV.vSignIn), _UC.signIn);
// router.post('/forgot-password', validate(_UV.vForgotPassword), _UC.forgotPassword);
// router.post('/change-password', validate(_UV.vChangePassword), _UC.changePassword);
module.exports = router;