var db_conn = require('./db_conn');

var user = function (user_email){
    conn = db_conn.db_conn();
    var sql = "SELECT * FROM USERS WHERE EMAIL = ?";
    conn.query(sql, user_email, function (err, result, fields){
        if (err){
            alert("SELECT USER FAIL");
            throw err;
        }
        console.log("SELECT USER SUCCESS");
        return result;
    })
};
