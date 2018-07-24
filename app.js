var express = require('express'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	trans = require('./scripts/translate.js');

var port = process.env.PORT || '3000';
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', function(req, res) {
	var urlParam = req.query.myParam;
	try {
		var content = JSON.stringify ([{'Text' : urlParam}]);
		var languages = '&to=es&to=de';
		var translateResponse = trans.translate(content, languages);
		var jsonObj = JSON.parse(translateResponse);
		
		res.render('index', {
			title: 'Pic2Learn - your everyday translator',
			language: jsonObj[0].detectedLanguage.language,
			translations: jsonObj[0].translations
		});

	} catch (err) {
		res.render('welcome', {
			locals: {
				title: 'Example nodejs'
			}
		});
	}
});

app.listen(port);