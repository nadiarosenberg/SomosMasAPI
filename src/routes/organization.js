const organizationCtrl = require('../controllers/organization');
var express = require('express');
var router = express.Router();

router.get('/', organizationCtrl.findAll);

module.exports = router;