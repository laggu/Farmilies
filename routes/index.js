var express = require('express');
var db_select = require('../db/db_select');
var db_insert = require('../db/db_insert');
var loopchain = require('../chain/loopchain_restFul');
var router = express.Router();
//var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('cookie');
    console.log(req.cookies);
    console.log(req.cookies.user ? true : false);
    res.render('index', { title: 'Farmilies', loggedin: req.cookies.user ? true : false });
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', function(req, res, next) {
    var email = req.body['email'];
    var pw = req.body['pw'];
    var name = req.body['name'];

    var person = {
        email: email,
        pw: pw,
        name : name
    };

    var callback = function (err, result){
        if (err){
            throw err;
        }
        var id = result['insertId'];
        loopchain.invoke_person(id);
    };

    db_insert.users(person, callback);

    res.redirect('signin');
});


router.get('/signin', function(req, res, next) {
    res.render('signin');
});

router.post('/signin', function(req, res, next) {
    var email = req.body['email'];
    var pw = req.body['pw'];

    var callback = function (err, result, fields){
        if (err){
            throw err;
        }

        if (result.length == 0) {
            res.redirect('/signin');
            return;
        }

        person = JSON.stringify(result[0]);
        console.log(person);
        console.log(person['id']);
        console.log(person['name']);

        console.log(result[0]);
        console.log(result[0]['id']);

        res.cookie('user', {
            id : result[0]['id'],
            name : result[0]['name']
        });
        res.redirect('/');
    };

    db_select.login(email, pw, callback);
    //res.redirect('/');
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
        res.render('search', {title: 'Farmilies', loggedin: req.cookies.user ? true : false , works: result, address: req.param("address")});
    });
});

router.get('/mypage', function(req, res, next) {
    var contract_as_farmer = db_select.contract_by_farmerid(1);
    var contract_as_citizen = db_select.contract_by_citizenid(1);

    var contract = {};

    contract.farmer = contract_as_farmer;
    contract.citizen = contract_as_citizen;

    res.render('mypage', {title: 'Farmilies', loggedin: req.cookies.user ? true : false ,});
});

router.get('/work_detail', function(req, res, next) {
    console.log(req.param("id"));

    var callback = function(err, result) {
        if (err) {
            return;
        }
        if (result.length == 0) {
            return;
        }
        console.log(result);

        res.render('work_detail', {title: "Farmilies", loggedin: req.cookies.user ? true : false, work: result[0]});
    };

    db_select.work_by_workid(req.param("id"), callback);
});

router.get('/contract_register', function(req, res, next) {
    res.render('contract_register', {title: "Farmilies", loggedin: req.cookies.user ? true : false});
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('user');
    res.redirect('/');
});

router.get('/workcheck', function(req, res, next) {
    res.sendfile('views/workcheck.html');
});

module.exports = router;