var express = require('express'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	trans = require('./scripts/translate.js');

var port = process.env.PORT || '3000';
var app = express();

app.set('scripts', __dirname + '/scripts');
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', function(req, res) {
	var urlParam = req.query.p;
	try {
		var content = JSON.stringify ([{'Text' : urlParam}]);
		var languages = '&to=es&to=de&to=fr&to=it';
		var translateResponse = trans.translate(content, languages, doStuff, res);
	} catch (err) {
		res.render('welcome', {
			locals: {
				title: 'Example nodejs'
			}
		});
	}
});

function doStuff(translateResponse, res) {
	var jsonObj = JSON.parse(translateResponse);
		if (jsonObj[0] != undefined) {
			res.render('index', {
				title: 'Pic2Learn - Your Everyday Translator',
				language: jsonObj[0].detectedLanguage.language,
				translations: jsonObj[0].translations
			});
		} else {
			res.render('welcome', {
				title: 'Pic2Learn - Your Everyday Translator'
			});
		}
}

app.listen(port);