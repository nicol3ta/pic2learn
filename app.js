var http = require('http');
//we need https for Microsoft Translate api call
var https = require('https');
var fs = require('fs');

var port = process.env.PORT || '3000';
 
var server = http.createServer((req, res) => {
   fs.readFile("index.html", function (err, data) {
        if (err) {
            console.log("error obtaining data");
        }
		res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>pic2learn</h1> <br> This is the translation:</br>' + Translate(content));
              res.end();
    });
}).listen(port);



//** Translation  */


// Replace the subscriptionKey string value with your valid subscription key.
let subscriptionKey = '7f4c9671819444a1bf78f44c29a13242';

let host = 'api.cognitive.microsofttranslator.com';
let path = '/translate?api-version=3.0';

let translation = 'none';

// Translate to Spanish and German.
let params = '&to=es&to=de';

let text = 'dog';

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let json = JSON.stringify(JSON.parse(body), null, 4);
        console.log('Translation:' +json);
        translation = json;

       
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let get_guid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

let Translate = function (content) {
    let request_params = {
        method : 'POST',
        hostname : host,
        path : path + params,
        headers : {
            'Content-Type' : 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            'X-ClientTraceId' : get_guid (),
        }
    };

    let r = https.request (request_params, response_handler);
    r.write (content);
    r.end ();

    return translation;
}

//here should be the annotation instead of static variable text
let content = JSON.stringify ([{'Text' : text}]);