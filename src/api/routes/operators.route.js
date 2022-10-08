const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')
const passport = require('passport');
require('../../middleware/passport')
const auth = passport.authenticate('jwt', { session: false })
const _OPV = require('../validations/operators.validation');
const _OPC = require('../controllers/operators.controller');

router.post('/signup-with-email', validate(_OPV.vSignUpWithEmail), _OPC.signupWithEmail);
router.post('/signup-social', validate(_OPV.vSocialSignUp), _OPC.socialSignUp);
router.post('/signin', validate(_OPV.vSignIn), _OPC.signIn);
router.post('/forgot-password', validate(_OPV.vForgotPassword), _OPC.forgotPassword);
router.post('/change-password', validate(_OPV.vChangePassword), _OPC.changePassword);
router.post('/get-with-phone', validate(_OPV.vGetWithPhone), _OPC.getOperatorWithPhone);
router.post('/add', validate(_OPV.vAddOperator), _OPC.addOperator)
router.post('/update', validate(_OPV.vUpdateOperator), _OPC.updateOperator)
module.exports = router;