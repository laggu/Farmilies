var db_conn = require('./db_conn.js');

var users = function (){
    conn = db_conn.db_conn();
    console.log("Success");
    var sql = "create table if not exists USERS(" +
        "id int not null auto_increment," +
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

var locations = function (){
    conn = db_conn.db_conn();
    console.log("Success");
    var sql = "create table if not exists LOCATIONS(" +
        "id int not null auto_increment," +
        "latitude double not null," +
        "longitude double not null," +
        "address_name varchar(100) not null," +
        "primary key(id)" +
        ")";
    var result = conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("LOCATIONS TABLE CREATED");
    });

    conn.end();
};

var works = function (){
    conn = db_conn.db_conn();
    console.log("Success");
    var sql = "create table if not exists WORKS(" +
        "id int not null auto_increment," +
        "farmer_id int not null," +
        "title char(100) not null," +
        "description varchar(500) not null," +
        "location_id int not null," +
        "primary key(id)," +
        "foreign key (farmer_id) references USERS(id) on delete cascade," +
        "foreign key (location_id) references LOCATIONS(id) on delete cascade" +
        ")";
    var result = conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("WORKS TABLE CREATED");
    });

    conn.end();
};



exports.users = users;
exports.locations = locations;
exports.works = works;

users();
locations();
works();