var db_conn = require('./db_conn');

var user = function (user_email){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM users WHERE EMAIL = '" + user_email + "'";

    var result = conn.query(sql, function (err, result, fields){
        if (err){
            //console.log(123);
            throw err;
        }
        //console.log(23);
        console.log("SELECT USER SUCCESS");
        //console.log(result);
        var person = result[0];
        return person;
    });
    console.log(result);
    return result;
};

console.log('asd');
a = user('abc@naver.com');
console.log(a);
console.log(a.email);