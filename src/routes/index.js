var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  res.render('../views/templateEmail', { title: "Mi titulo", text: "Mi text", contact: "Mi contact", url: "https://www.nacionrex.com/__export/1617326769369/sites/debate/img/2021/04/01/blackpink-test-guro-de-moda_1_crop1617325906172.jpg_242310155.jpg" });
});

module.exports = router;
