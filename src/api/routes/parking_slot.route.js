const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')
const passport = require('passport');
require('../../middleware/passport')
const auth = passport.authenticate('jwt', { session: false })
const { vAddSlot } = require('../validations/index')
const { addSlot } = require('../controllers/index')

router.post('/add', auth, validate(vAddSlot), addSlot);

module.exports = router;