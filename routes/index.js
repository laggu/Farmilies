var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/workcheck', function(req, res, next) {
    res.sendfile('views/workcheck.html');
});


module.exports = router;
