const organizationCtrl = require('../controllers/organization');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', organizationCtrl.findAll);

module.exports = router;