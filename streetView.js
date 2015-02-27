var express = require('express');
var app = express();
var request = require('request');
var _ = require('underscore');
var string = require('string');
var msTranslator = require('mstranslator');


// Translation related Language parameters:
var fromLang = "en",
    toLang = "zh";

//set up translator
var client = new msTranslator({
  client_id: "OER",
  client_secret: "iCjexcXNhME+t9rOhdz7WribW+n8Pn0p207O7DpQMvA="
}, true);


var getCoordinates = function (url){
    var latitude;
	var longitude;
	   request(url, function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            var parsedJSON = JSON.parse(body);
				console.log(parsedJSON) // Print the json object
	        }
	    });
}

getHTMLContent = function (url, callback){
	var html = "";
	var instructionStrings = [];
	var inc = 0;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedJSON = JSON.parse(body);
            // console.log(JSON.stringify(parsedJSON, null, 2));
			var parsedRoutes = parsedJSON.routes;
			_.each(parsedRoutes, function(route, key){
				_.each(route, function(value, key){
					if (key == 'legs'){
						_.each(value, function(leg, key){
							_.each(leg.steps, function(step, key){
								inc++;
								var lat;
								var lng;
								html += "<h1>Step "+ inc + ": </h1>";
								html += "<h2>" + step.html_instructions;
								// Insert audio instructions:
								var textInstructions = string(step.html_instructions).stripTags().s;
								instructionStrings.push(textInstructions);
								var audioURL = "http://tts-api.com/tts.mp3?q="+encodeURIComponent(textInstructions);
								var audio_html = '<audio controls><source src="'+audioURL+'" type="audio/mpeg"></audio>';
								html += audio_html + "<h2>";
								//translation:
								html += "<div class='translation'>Translation "+inc+"</div>";
								lat = step.end_location.lat;
								lng = step.end_location.lng;
								html = html + getImageElement(lat, lng);
							});
							//console.log(html);
						});
					}
				});
			});
			callback(html, instructionStrings);
    	}//IF
	});
}

var getImageElement = function(lat, lng){
	var imageElement = "<h3><img src='"
	url = "https://maps.googleapis.com/maps/api/streetview?size=200x200&location="+lat+","+lng+"&heading=235";
	imageElement = imageElement + url + "'></h3>"
	return imageElement;
}



    // var mytext = "Walk 500 meters north on market street";

    // var params = {
    //   text: 'How\'s it going?',
    //   from: 'en',
    //   to: 'es'
    // };

    // // Don't worry about access token, it will be auto-generated if needed.
    // client.translate({text: mytext, from: fromLang, to: toLang}, function(err, data) {
    //     console.log(data);

    //     // var html = "<audio controls>"+
    //     //     '<source src="http://tts-api.com/tts.mp3?q='+encodeURIComponent(mytext)+'" type="audio/mpeg">' +
    //     //     '</audio>';
    //     // res.send(html);
    // });

    // var mytext = "Walk 500 meters north on market street";
    // var html = "<audio controls>"+
    //     '<source src="http://tts-api.com/tts.mp3?q='+encodeURIComponent(mytext)+'" type="audio/mpeg">' +
    //     '</audio>';
    // res.send(html);

    // // var url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + start +
    // //           "&destination=" + end + "&mode=" + method + "&key=AIzaSyCf2AEb5wOD8riXjDWtWLuFkYd5hHuvSX4";
    // // request(url, function (error, response, body) {
    // //     if (!error && response.statusCode == 200) {
    // //         console.log(body) // Print the google web page.
    // //         res.send(body);
    // //     } else {
    // //       console.log("Error occured");
    // //     }
    // });