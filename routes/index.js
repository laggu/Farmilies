var express = require('express');
var db_select = require('../db/db_select');
var db_insert = require('../db/db_insert');
var db_update = require('../db/db_update');
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
            result[i] = JSON.stringify(result[i]);
        }
        res.render('search', {title: 'Farmilies', loggedin: req.cookies.user ? true : false , works: result, address: req.param("address")});
    });
});

router.get('/mypage', function(req, res, next) {
    console.log("mypage 접속");
    var contract_as_farmer = db_select.contract_by_farmerid(1);
    var contract_as_citizen = db_select.contract_by_citizenid(1);

    var flag = 0;

    var contract = {};

    contract.farmer = contract_as_farmer;
    contract.citizen = contract_as_citizen;

    res.render('mypage', {title: 'Farmilies', loggedin: req.cookies.user ? true : false , flag: flag});
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

        res.render('work_detail', {title: "Farmilies", loggedin: req.cookies.user ? true : false, user_id: req.cookies.user.id, work: result[0]});
    };

    db_select.work_by_workid(req.param("id"), callback);
});

router.get('/work_register', function(req, res, next) {
    res.render('work_register', {title: "Farmilies", loggedin: req.cookies.user ? true : false});
});

router.post('/work_register', function(req, res, next) {
    var work = {
        farmer_id: req.cookies.user.id,
        title: req.body.title,
        address_name: req.body.address_name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        reward: req.body.reward,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        description: req.body.description
    };
    var callback = function(err, result){
        if(err){
            return;
        }
        if (result.length == 0){
            return;
        }
        console.log("작업 등록 완료");
        console.log(result);
        res.render('mypage', {title: "Farmilies", loggedin: req.cookies.user ? true : false, flag: req.cookies.flag});
    };

    db_insert.works(work, callback);
});

router.get('/qrcode', function(req, res, next) {
    res.render('qrcode', {title: "Farmilies", loggedin: req.cookies.user ? true : false, id: req.cookies.user.id, name: req.cookies.user.name});
});

router.get('/logout', function(req, res, next) {
    res.clearCookie('user');
    res.redirect('/');
});

router.get('/work_check', function(req, res, next) {
    db_select.contract_by_farmerid(req.param('id'), function(err, result) {
        if (err) {
            return;
        }
        if (result.length == 0) {
            return;
        }

        console.log(result);

        res.render('work_check', {title: "Farmilies", loggedin: req.cookies.user ? true : false, id: req.cookies.user.id, people: result });
    })
});

router.get('/ajax_user_info', function(req, res, next) {
    var callback = function(body){
        var data = JSON.parse(body.response.result.data);
        res.render('user_info', {name: req.cookies.user.name, token: data.token, binded_token: data.binded_token, rating: data.rating_count ? (data.rating/data.rating_count) : 0 });
    };
    loopchain.query_person(String(req.cookies.user.id), callback);

});

router.get('/ajax_participating_list', function(req, res, next) {
    var callback = function(err, result) {
        if (err) {
            return;
        }
        if (result.length == 0) {
            return;
        }
        console.log(result);

        res.render('participating_working_list', {works: result});
    };

    db_select.contract_by_citizenid(req.cookies.user.id, callback);
});

router.get('/ajax_applicant_list', function(req, res, next) {
    var callback = function(err, result) {
        if (err) {
            return;
        }
        if (result.length == 0) {
            return;
        }
        console.log(result);

        res.render('applicant_list', {works: result});
    };

    db_select.contract_by_farmerid(req.cookies.user.id, callback);
});

router.get('/ajax_uploaded_working_list', function(req, res, next) {
    var callback = function(err, result) {
        if (err) {
            return;
        }
        if (result.length == 0) {
            return;
        }
        console.log(result);

        res.render('uploaded_working_list', {works: result});
    };

    db_select.work_by_farmerid(req.cookies.user.id, callback);
});

router.get('/ajax_get_contract_status', function(req, res, next) {
    var callback = function(err, result) {
        if (err) {
            return;
        }
        console.log(result);
        if (result.length == 0) {
            res.send('0');
        }
        else {
            res.send('1')
        }
    };

    db_select.work_by_farmerid(req.cookies.user.id, callback);
});

router.get('/change_work_status', function(req, res, next) {
    console.log("change_work_status");
    console.log(req);
    console.log(req.query.id);
    var callback = function(err, result) {
        if (err) {
            return;
        }
        if (result.length == 0) {
            return;
        }
        console.log(result);

        var callback = function(body){
            console.log(body);
            res.send();
        };

        if(req.query.status == '작업확정'){
            loopchain.invoke_contract(req.query.id, String(req.cookies.user.id), req.query.address, req.query.reward, req.query.citizen, req.query.when, callback);
        }else if(req.query.status == '취소'){
            loopchain.invoke_cancel(req.query.id, String(req.cookies.user.id), "", new Date().toLocaleString(), callback);
        }
    };

    db_update.contract_status(req.query.id, req.query.status, callback);
});

module.exports = router;