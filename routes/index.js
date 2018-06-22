var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
    res.render('search', {works: [{id: 1, title: '감귤농장', reward: 5},{id: 2, title: '모내기', reward: 8},{id: 3, title: '배추농사', reward: 15}]});
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', bodyParser.urlencoded({extended: false}), function(req, res, next) {
    var email = req.body.email;
    var pw = req.body.pw;
    var name = req.body.name;

    console.log(req.headers);
    console.log(req.body);
    console.log(email);
    console.log(pw);
    console.log(name);

    res.redirect('signin');
});

router.get('/signin', function(req, res, next) {
    res.render('signin');
});

router.get('/workcheck', function(req, res, next) {
    res.sendfile('views/workcheck.html');
});

module.exports = router;