var db_conn = require('./db_conn');

var contract_status = function (id, status, callback){
    conn = db_conn.db_conn();
    //var sql = "SELECT * FROM USERS WHERE EMAIL = '" + user_email + "'";
    var sql = "UPDATE CONTRACTS set status = '" + status + "' where id = " + id;
    conn.query(sql, callback);
    conn.end();
};

module.exports.contract_status = contract_status;

contract_status(1, "대기중", function(err ,result){
    if(err)
        return;
    console.log(result);
});