const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')
const passport = require('passport');
require('../../middleware/passport')
const auth = passport.authenticate('jwt', { session: false })
const { vEnterExitVehical, vPropertyId } = require('../validations/index')
const { enterVehical, exitVehical, slotsDashboard } = require('../controllers/index')

router.post('/enter-vehical', auth, validate(vEnterExitVehical), enterVehical);
router.post('/exit-vehical', auth, validate(vEnterExitVehical), exitVehical);
router.post('/dashboard', auth, validate(vPropertyId), slotsDashboard);

module.exports = router;