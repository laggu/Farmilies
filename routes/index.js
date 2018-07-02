var express = require('express');
var db_select = require('../db/db_select');
var router = express.Router();
//var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', loggedin: true });
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', function(req, res, next) {
    var email = req.body['email'];
    var pw = req.body['pw'];
    var name = req.body['name'];

    console.log(req.headers);
    console.log(req.body);
    console.log(email);
    console.log(pw);
    console.log(name);

    res.redirect('signin');
});

router.get('/signup2', function(req, res, next) {
    var email = req.param('email');
    var pw = req.param('pw');
    var name = req.param('name');

    console.log(req.headers);
    console.log(req.body);
    console.log(email);
    console.log(pw);
    console.log(name);

    res.render('signup');
});

router.get('/signin', function(req, res, next) {
    res.render('signin');
});

router.post('/signin', function(req, res, next) {
    var email = req.body.email;
    var pwd = req.body.pwd;

    console.log(email);
    console.log(pwd);

    var callback = function (err, result, fields){
        if (err){
            throw err;
        }

        person = JSON.stringify(result[0]);
        console.log(person);

        res.cookie('user', {
            id : person.id,
            name : person.name
        });
    };

    db_select.login(email, pwd, callback);

    res.redirect('/');
});

router.get('/search', function(req, res, next) {
    console.log(req.param("address"));
    db_select.work_all(function (err, result) {
        if (err) {
            return;
        }
        for(var i=0; i < result.length; ++i){
            //console.log(result[i]);
            result[i] = JSON.parse(JSON.stringify(result[i]));
            console.log(result[i]);
        }
        res.render('search', {works: result, address: req.param("address")});
    });
});

router.get('/mypage', function(req, res, next) {
    var contract_as_farmer = db_select.contract_by_farmerid(1);
    var contract_as_citizen = db_select.contract_by_citizenid(1);

    var contract = {};

    contract.farmer = contract_as_farmer;
    contract.citizen = contract_as_citizen;

    res.render('mypage', contract);
});

router.get('/contract_detail', function(req, res, next) {
    console.log(req.param("id"));
    res.render('contract_detail');
});

router.get('/contract_register', function(req, res, next) {
    res.render('contract_register');
});

router.get('/logout', function(req, res, next) {
    res.redirect('/');
});

router.get('/workcheck', function(req, res, next) {
    res.sendfile('views/workcheck.html');
});

module.exports = router;