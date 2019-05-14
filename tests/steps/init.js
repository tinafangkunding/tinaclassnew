'use strict';

const co = require('co');
const Promise = require('bluebird');
const awscred = Promise.promisifyAll(require('awscred'));

let initialized = false;

let init = co.wrap(function*(){
    if(initialized){
        return;
    }

    process.env.restaurants_api = "https://vo6fha5uj4.execute-api.us-east-1.amazonaws.com/dev/restaurants";
    process.env.restaurants_table = "restaurants2";
    process.env.AWS_REGION = "us-east-1";
    process.env.cognito_client_id = "test_cognito_client_id";
    process.env.cognito_user_pool_id = "us-east-1_plji5Qpmj";
    process.env.cognito_server_client_id = "3dpcquk86lnjgcrpsh6vfr5o5b";

    let cred = (yield awscred.loadAsync()).credentials;
    process.env.AWS_ACCESS_KEY_ID = cred.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = cred.secretAccessKey;

    console.log("AWS credentials loaded");
    
    if(cred.sessionToken){
        process.env.AWS_SESSION_TOKEN = cred.sessionToken;
    }  

    initialized = true;
});

module.exports.init = init;