var express = require('express');
var router = express.Router();
<<<<<<< HEAD

router.get('/', function(req, res, next) {
  res.status(200).json({ title: 'Express' });
=======
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
>>>>>>> fefe826 (Clean repository backbone)
});

module.exports = router;
