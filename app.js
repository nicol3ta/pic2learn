const http = require('http');
var fs = require('fs');

var port = process.env.PORT || '3000';

const server = http.createServer((req, res) => {
    fs.readFile("index.html", function (err, data) {
        if (err) {
            console.log("error obtaining data");
        }
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(data);
        res.end();
    });
}).listen(port);