var rpc_id = 1;
var request = require('request');

var invoke_contract = function(contract_key, farmer_key, address, reward, citizen_key, when){
    var restURL = 'transactions';
    var functionName = 'invoke_contract';
    var param = {
        key: contract_key,
        value: {
            farmer: farmer_key,
            location: address,
            reward: reward,
            citizen: citizen_key,
            when: when,
            fulfillment: 'yet'
        }
    };
    call_loopchain_rest(restURL, functionName, param);
};

var invoke_done = function (contract_key, starting_time, end_time) {
    var restURL = 'transactions';
    var functionName = 'invoke_done';
    var param = {
        key: contract_key,
        value: {
            starting_time: starting_time,
            end_time: end_time
        }
    };
    call_loopchain_rest(restURL, functionName, param);
};

var invoke_cancel = function (contract_key, canceler, why, uptime) {
    var restURL = 'transactions';
    var functionName = 'invoke_cancel';
    var param = {
        key: contract_key,
        value: {
            who: canceler,
            why: why,
            uptime: uptime
        }
    };
    call_loopchain_rest(restURL, functionName, param);
};

var invoke_person = function(person_key){
    var restURL = 'transactions';
    var functionName = 'invoke_person';
    var param = {
        key: person_key
    };
    call_loopchain_rest(restURL, functionName, param);
};

var invoke_rating = function(person_key, rating){
    var restURL = 'transactions';
    var functionName = 'invoke_rating';
    var param = {
        key: person_key,
        rating: rating
    };
    call_loopchain_rest(restURL, functionName, param);
};

var invoke_purchase_token = function(person_key, purchase_token){
    var restURL = 'transactions';
    var functionName = 'invoke_purchase_token';
    var param = {
        key: person_key,
        purchase_token: purchase_token
    };
    call_loopchain_rest(restURL, functionName, param);
};

var invoke_spend_token = function(person_key, spending_amount){
    var restURL = 'transactions';
    var functionName = 'invoke_spend_token';
    var param = {
        key: person_key,
        spending_amount: spending_amount
    };
    call_loopchain_rest(restURL, functionName, param);
};

var query_contract = function (contract_key) {
    var restURL = 'query';
    var functionName = 'query_contract';
    var param = {
        key: contract_key
    };
    call_loopchain_rest(restURL, functionName, param);
};

var query_person = function (person_key) {
    var restURL = 'query';
    var functionName = 'query_person';
    var param = {
        key: person_key
    };
    call_loopchain_rest(restURL, functionName, param);
};

var call_loopchain_rest = function (restURL, functionName, param) {
    var temp_rpc_id = rpc_id++;
    if(restURL == 'query'){
        temp_rpc_id = String(temp_rpc_id);
    }

    var options = {
        headers: {'Content-Type': 'application/json'},
        url: 'http://localhost:9000/api/v1/' + restURL,
        body: {
            "jsonrpc": "2.0",
            "id": temp_rpc_id,
            "method": functionName,
            "params": param
        },
        json: true
    };
    console.log('call_loopchain_rest');
    request.post(options, function(err, res, body){
        console.log('');
        if(err)
            console.log("error");
        if (res.statusCode == 200) {
            console.log(body)
            console.log(body['response']['code']);
            console.log(JSON.parse(body['response']['result']['data']))
            // if(functionName=='query_contract'){
            //     var a = JSON.parse(body['response']['result']['data']);
            //     console.log(a['location']);
            // }
        }
    });
};

//
// invoke_person('1');
// invoke_person('2');
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// query_person('1');
// query_person('2');
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// invoke_purchase_token('1', "10");
// invoke_purchase_token('2', "20");
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// query_person('1');
// query_person('2');
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// invoke_spend_token('1', "3");
// invoke_spend_token('2', "4");
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// query_person('1');
// query_person('2');
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// invoke_contract('1', '1', "서울시", 3, '2', "내일");
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// query_contract('1');
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// invoke_cancel('1', '1', "그냥", "어제");
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// query_contract('1');
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// invoke_contract('2', '2', "서울시", 3, '1', "내일");
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// query_contract('2');
//
// for(var i = 0 ; i < 1000000000; ++i);
//
// invoke_done('2', "09:00", "18:00");
//
// for(var i = 0 ; i < 1000000000; ++i);

query_contract('2');