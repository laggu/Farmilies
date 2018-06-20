var db_conn = require('./db_conn');

var user = function (user_email, callback){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM users WHERE EMAIL = '" + user_email + "'";
    conn.query(sql, callback );
    conn.end();
};


/*
var p = function (err, result, fields){
    if (err){
        throw err;
    }
    console.log("SELECT USER SUCCESS");
    person = JSON.stringify(result[0]);
    console.log(person);
};

a = user('abc@naver.com', p);
console.log(a);
*/