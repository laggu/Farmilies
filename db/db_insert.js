var db_conn = require('./db_conn.js');

var insert = function (table, value, callback){
    conn = db_conn.db_conn();

    var sql = "INSERT INTO "+ table +" SET ?";
    console.log(sql);
    conn.query(sql, value, callback);
    // conn.query(sql, value, function (err, result){
    //     if (err){
    //         throw err;
    //     }
    //     console.log(result);
    //     console.log(result['insertId']);
    //     console.log("INSERT INTO " + table + " SUCCESS");
    // });

    conn.end();
};

var users = function (user, callback){
    insert("USERS", user, callback);
};

var works = function (work, callback){
    insert("WORKS", work, callback);
};

var contracts = function (contract, callback){
    insert("CONTRACTS", contract, callback);
};

var locations = function (location, callback){
    insert("LOCATIONS", location, callback);
};

module.exports.users = users;
module.exports.works = works;
module.exports.contracts = contracts;
//module.exports.locations = locations;

person = {
    email: 'abcd@naver.com',
    pw : 'asdf',
    name : 'hi',
    photo : 'aaaa'
};

person2 = {
    email: 'qwe@naver.com',
    pw: 'qwer',
    name : 'aaa'
};

//users(person);
// users(person2);


// address = {
//     latitude: 3.0,
//     longitude: 5.0,
//     address_name: '서울시 강남구 테헤란로 20'
// };
// locations(address);

work = {
    farmer_id: 2,
    title: '감자캐기',
    description: '와서 좀 도와라',
    reward: 10,
    latitude: 36.298527,
    longitude: 127.070162,
    address_name: '서울시 강남구 테헤란로 20'
};
// works(work);

// contract = {
//     citizen_id: 2,
//     work_id: 1,
//     date: '2018-08-10 19:00:00'
// };
contract = {
    citizen_id: 1,
    work_id: 2,
    date: '2018-07-10 19:00:00'
};
// contracts(contract);