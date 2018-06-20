var db_conn = function (){
    var mysql = require('mysql');
    var config = require('./db_info').local;

    var con = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
    });

    con.connect(function (err) {
        if (err) {
            console.error('mysql connection error :' + err);
        } else {
            console.info('mysql is connected successfully.');
        }
    });
    return con;
};

exports.db_conn = db_conn;