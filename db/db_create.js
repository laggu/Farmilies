var db_conn = require('./db_conn.js');

var users = function (){
    conn = db_conn.db_conn();
    var sql = "create table if not exists USERS(" +
        "id int not null auto_increment," +
        "email varchar(50) not null," +
        "pw char(64) not null," +
        "name varchar(10) not null," +
        "photo varchar(30)," +
        "primary key(id)," +
        "unique index (email)" +
        ") engine = InnoDB default charset=utf8";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("USER TABLE CREATED");
    });

    conn.end();
};

var locations = function (){
    conn = db_conn.db_conn();
    var sql = "create table if not exists LOCATIONS(" +
        "id int not null auto_increment," +
        "latitude double not null," +
        "longitude double not null," +
        "address_name varchar(100) not null," +
        "primary key(id)" +
        ") engine = InnoDB default charset=utf8";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("LOCATIONS TABLE CREATED");
    });

    conn.end();
};

var works = function (){
    conn = db_conn.db_conn();
    var sql = "create table if not exists WORKS(" +
        "id int not null auto_increment," +
        "farmer_id int not null," +
        "title char(100) not null," +
        "description varchar(500) not null," +
        "reward int not null," +
        "latitude double not null," +
        "longitude double not null," +
        "address_name varchar(100) not null," +
        "primary key(id)," +
        "foreign key (farmer_id) references USERS(id) on delete cascade" +
        ") engine = InnoDB default charset=utf8";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("WORKS TABLE CREATED");
    });

    conn.end();
};

var contracts = function(){
    conn = db_conn.db_conn();
    var sql = "create table if not exists CONTRACTS(" +
        "id int not null auto_increment," +
        "citizen_id int not null," +
        "work_id int not null," +
        "status varchar(10) default '대기중'," +
        "date datetime not null," +
        "primary key(id)," +
        "foreign key (citizen_id) references USERS(id) on delete cascade," +
        "foreign key (work_id) references WORKS(id) on delete cascade" +
        ") engine = InnoDB default charset=utf8";
    conn.query(sql, function (err, result){
        if (err){
            throw err;
        }
        console.log("CONTRACTS TABLE CREATED");
    });

    conn.end();
};

exports.users = users;
//exports.locations = locations;
exports.works = works;
exports.contracts = contracts;

users();
works();
contracts();