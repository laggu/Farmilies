var db_conn = require('./db_conn.js');

var insert = function (table, value){
    conn = db_conn.db_conn();

    var sql = "INSERT INTO "+ table +" SET ?";
    console.log(sql);
    conn.query(sql, value, function (err, result){
        if (err){
            throw err;
        }
        console.log("INSERT INTO " + table + " SUCCESS");
    });

    conn.end();
};

var users = function (user){
    insert("USERS", user);
};

var works = function (work){
    insert("WORKS", work);
};

var contracts = function (contract){
    insert("CONTRACTS", contract);
};

var locations = function (location){
    insert("LOCATIONS", location);
};

module.exports.users = users;
module.exports.works = works;
module.exports.contracts = contracts;
module.exports.locations = locations;


person = {
    email: 'abc@naver.com',
    pw : 'asdf',
    name : 'max',
    photo : 'aaaa'
};

person2 = {
    email: 'qwe@naver.com',
    pw: 'qwer',
    name : 'aaa'
};

users(person);
users(person2);


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
    latitude: 34.298527,
    longitude: 51.070162,
    address_name: '서울시 강남구 테헤란로 20'
};
works(work);

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
contracts(contract);
