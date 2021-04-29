const organizationCtrl = require('../controllers/organization')
var express = require('express')
var router = express.Router()

router.get('/', organizationCtrl.findAll)
router.get('/public/:id', organizationCtrl.findOne)

module.exports = router;