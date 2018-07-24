'use strict';
var fs = require ('fs');
var https = require ('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the subscriptionKey string value with your valid subscription key.
var subscriptionKey = '7f4c9671819444a1bf78f44c29a13242';

var host = 'api.cognitive.microsofttranslator.com';
var path = '/translate?api-version=3.0';

// Translate to German and Italian.
var translationResult;

var response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        translationResult = JSON.stringify(JSON.parse(body), null, 4);
        console.log(translationResult);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

var get_guid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
    translate : function (content, params) {
    var request_params = {
        method : 'POST',
        hostname : host,
        path : path + params,
        headers : {
            'Content-Type' : 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'X-ClientTraceId' : get_guid (),
        }
    };

    var req = https.request (request_params, response_handler);
    req.write (content);
    req.end ();

    return translationResult;
}    
}
