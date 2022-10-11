const express = require('express')
const router = express.Router()

router.use('/users', require('./users.route'))
router.use('/properties',  require('./properties.route'))
router.use('/owners', require('./owners.route'))
router.use('/operators', require('./operators.route'))
router.use('/parking-slots', require('./parking_slot.route'))

module.exports = router;