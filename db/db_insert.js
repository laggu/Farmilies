var db_conn = require('./db_conn.js');

var user = function (user){
    conn = db_conn.db_conn();
    console.log("Success");
    console.log(conn);
    var sql = "INSERT INTO users SET ?";
    var result = conn.query(sql, user, function (err, result){
        if (err){
            throw err;
        }
        console.log("INSERT INTO USER SUCCESS");
        return result;
    });

    conn.end();
    return result;
};


person = {
    email: 'abc@naver.com',
    pw : 'asdf',
    name : 'max',
    photo : 'aaaa'
}

user(person);