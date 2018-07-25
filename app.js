var express = require('express'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	trans = require('./scripts/translate.js');
	bingImages = require('./scripts/image.js');

var port = process.env.PORT || '3000';
var app = express();

var urlParam = '';
var imageUrl = '';
var translateResponse = '';

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', function(req, res) {
	 urlParam = req.query.p;
	
	try {
		var content = JSON.stringify ([{'Text' : urlParam}]);
		var languages = '&to=es&to=de';
		//translateResponse = trans.translate(content, languages);

		asyncCall(urlParam, content, languages);

		var jsonObj = JSON.parse(translateResponse);


		if(jsonObj != null)
		{
			console.log("Image url " + imageUrl);	
			try{
				imageUrl = bingImages.getImage(urlParam);

				res.render('index', {
					title: 'Pic2Learn - Your Everyday Translator',
					language: jsonObj[0].detectedLanguage.language,
					translations: jsonObj[0].translations,
					imageSrc: imageUrl
				});
			}
			catch(err)
			{
				res.render('index', {
					title: 'Pic2Learn - Your Everyday Translator',
					language: jsonObj[0].detectedLanguage.language,
					translations: jsonObj[0].translations,
				});
			}
		}
	} catch (err) {
		res.render('welcome', {
			locals: {
				title: 'Example nodejs'
			}
		});
	}
});

app.listen(port);



