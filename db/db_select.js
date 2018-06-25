var db_conn = require('./db_conn');

var user_by_email = function (user_email, callback){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM USERS WHERE EMAIL = '" + user_email + "'";
    conn.query(sql, callback);
    conn.end();
};

var login = function (user_email, user_pw, callback){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM USERS WHERE EMAIL = '" + user_email + "' and pw = '" + user_pw + "'";
    conn.query(sql, callback);
    conn.end();
};

var user_by_id = function (user_id, callback){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM USERS WHERE id = " + user_id;
    conn.query(sql, callback);
    conn.end();
};

var work_all = function(callback){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM WORKS";
    console.log(sql);
    conn.query(sql, callback);
    conn.end();
};

var work_by_farmerid = function (user_id, callback){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM USERS, WORKS WHERE USERS.id = WORKS.farmer_id and USERS.id = " + user_id;
    conn.query(sql, callback);
    conn.end();
};

var contract_by_citizenid = function (citizen_id, callback){
    conn = db_conn.db_conn();
    var sql = "SELECT WORKS.title, WORKS.reward, WORKS.address_name, FARMER.name, CONTRACTS.id, CONTRACTS.date, CONTRACTS.status FROM USERS as FARMER, WORKS, CONTRACTS WHERE FARMER.id = WORKS.farmer_id and WORKS.id = CONTRACTS.work_id and CONTRACTS.citizen_id = " + citizen_id;
    conn.query(sql, callback);
    conn.end();
};

var contract_by_farmerid = function (farmer_id, callback){
    conn = db_conn.db_conn();
    var sql = "SELECT WORKS.title, WORKS.reward, CITIZEN.name, CONTRACTS.id, CONTRACTS.date, CONTRACTS.status FROM USERS as FARMER, USERS as CITIZEN, WORKS, CONTRACTS WHERE FARMER.id = WORKS.farmer_id and WORKS.id = CONTRACTS.work_id and CONTRACTS.citizen_id = CITIZEN.id  and FARMER.id = " + farmer_id;
    conn.query(sql, callback);
    conn.end();
};

module.exports.login = login;
module.exports.user_by_id = user_by_id;
module.exports.work_by_farmerid = work_by_farmerid;
module.exports.work_all = work_all;
module.exports.contract_by_citizenid = contract_by_citizenid;
module.exports.contract_by_farmerid = contract_by_farmerid;

var p = function (err, result, fields){
    if (err){
        console.log("SELECT USER FAIL");
        throw err;
    }
    console.log("SELECT USER SUCCESS");
    person = JSON.stringify(result[0]);
    console.log(person);
};


var q = function (err, result, fields){
    if (err){
        console.log("SELECT USER FAIL");
        throw err;
    }
    console.log("SELECT WORKS SUCCESS");
    works = JSON.stringify(result);
    console.log(works);
};

// user_by_id(2, p);
// login('abc@naver.com', 'asdf', p);
// work_by_farmerid(1, q);
// contract_by_citizenid(2,q);
// contract_by_farmerid(1,q);