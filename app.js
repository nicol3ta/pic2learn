var express = require('express'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	trans = require('./scripts/translate.js');
	bingImages = require('./scripts/image.js');

var port = process.env.PORT || '3000';
var app = express();

var urlParam ='';

app.set('scripts', __dirname + '/scripts');
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', function(req, res) {
	 urlParam = req.query.p;
	
	try {
		var content = JSON.stringify ([{'Text' : urlParam}]);
		var languages = '&to=es&to=de';
		translateResponse = trans.translate(content, languages, doStuff, res);
	
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
    try{

     bingImages.getImage(urlParam, jsonObj, renderHtml, res);
    }
   catch(err)
   {
   		console("failed to get image");
   }
}


function renderHtml(jsonObj, imageUrl, res)
{
		if (jsonObj[0] != undefined && imageUrl !=undefined){        	
        		 res.render('index', {
	                title: 'Pic2Learn - Your Everyday Translator',
	                language: jsonObj[0].detectedLanguage.language,
	                translations: jsonObj[0].translations,
	               imageSrc: imageUrl
          		  });   
    	}
           
         else {
         	console.log('boo');
            res.render('welcome', {
                title: 'Pic2Learn - Your Everyday Translator'
            });
        }
}


app.listen(port);



