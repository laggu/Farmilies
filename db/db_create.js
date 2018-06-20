var db_conn = require('./db_conn.js');

var user = function (){
    conn = db_conn.db_conn();
    console.log("Success");
    var sql = "CREATE TABLE USERS(" +
        "id mediumint not null auto_increment," +
        "email varchar(50) not null," +
        "pw char(64) not null," +
        "name varchar(10) not null," +
        "photo varchar(30)," +
        "primary key(id)," +
        "unique index (email))";
    var result = conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("USER TABLE CREATED");
    });

    conn.end();
};

var works = function (){
    conn = db_conn.db_conn();
    console.log("Success");
    var sql = "CREATE TABLE WORKS(" +
        "id mediumint not null auto_increment," +
        "email varchar(50) not null," +
        "pw char(64) not null," +
        "name varchar(10) not null," +
        "photo varchar(30)," +
        "primary key(id))";
    var result = conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("USER TABLE CREATED");
    });

    conn.end();
};



exports.user = user;

user();