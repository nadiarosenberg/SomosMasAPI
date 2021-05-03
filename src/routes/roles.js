var express = require('express');
var router = express.Router();
const Controller = require('../controllers/rolecontroller')

router.get('/', Controller.get);
router.get('/:id', Controller.getOne);
router.patch('/:id', Controller.patchRole);
router.delete('/:id', Controller.deleteRole);
router.post('/', Controller.postRole);


module.exports = router;
