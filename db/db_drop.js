var db_conn = require('./db_conn.js');

var users = function (){
    conn = db_conn.db_conn();
    var sql = "drop table USERS";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("USER TABLE DROPPED");
    });

    conn.end();
};

var locations = function (){
    conn = db_conn.db_conn();
    var sql = "drop table LOCATIONS";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("LOCATIONS TABLE DROPPED");
    });

    conn.end();
};

var works = function (){
    conn = db_conn.db_conn();
    var sql = "drop table WORKS";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("WORKS TABLE DROPPED");
    });

    conn.end();
};

var contracts = function (){
    conn = db_conn.db_conn();
    var sql = "drop table CONTRACTS";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("CONTRACTS TABLE DROPPED");
    });

    conn.end();
};

contracts();
works();
locations();
users();
