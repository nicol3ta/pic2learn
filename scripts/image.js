'use strict';

let fs = require ('fs');
let https = require('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the subscriptionKey string value with your valid subscription key.
var subscriptionKey = '063d660fc87c4357b8ef2d835c6a3745';

// Verify the endpoint URI.  At this writing, only one endpoint is used for Bing
// search APIs.  In the future, regional endpoints may be available.  If you
// encounter unexpected authorization errors, double-check this host against
// the endpoint for your Bing Search instance in your Azure dashboard.
var host = 'api.cognitive.microsoft.com';
var path = '/bing/v7.0/images/search';

var imageJson;

var response_handler = function (response) {
    let body = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        imageJson = JSON.parse(body).value[1].thumbnailUrl;
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};


module.exports = {
 getImage : function (search) {
  let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(search),
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    var req = https.request (request_params, response_handler);
    req.write (search);
    req.end ();

    return imageJson;
 }
}


//if (subscriptionKey.length === 32) {
 //   bing_image_search(term);
//} else {
//    console.log('Invalid Bing Search API subscription key!');
//    console.log('Please paste yours into the source code.');
//}