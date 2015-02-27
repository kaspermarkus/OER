var express = require('express');
var app = express();
var request = require('request');
var _ = require('underscore');
var string = require('string');

var getCoordinates = function (url){
    var latitude;
	var longitude;
	   request(url, function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            var parsedJSON = JSON.parse(body);
	        }
	    });
}

getHTMLContent = function (url, callback){
	var html = "";
	var instructionStrings = [];
	var total_duration = 0;
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
							total_duration = Math.round(leg.duration.value / 60);
							$("h1").text("You are "+total_duration+" minutes away from your destination");
							_.each(leg.steps, function(step, key){
								inc++;

								html += '<div class="single_step">';
								html += '<div class = "title">';
								html += '<h2>Step '+ inc + ':</h2>';
								html += '</div>';

								html += '<div class="content">';
								html += '<div class="image_content">';

								lat = step.start_location.lat;
								lng = step.start_location.lng;
								html += getImageElement(lat, lng);

								html += '</div>';
								html += '<div class="instructions">';
								html += '<h3>'+step.html_instructions+'</h3>';
								html += '<h3 class="translation"></h3>';
								html += "<p>Duration: "+step.duration.text+"</p>";
								html += "<p>Distance: "+step.distance.text+"</p>";
								html += '<p class="step_warning">';
								html += 'If you feel lost, play this track for someone to ask for direction';
								html += '</p>';

								html += '<p class="step_sound">';
								// Insert audio instructions:
								var textInstructions = string(step.html_instructions).stripTags().s;
								instructionStrings.push(textInstructions);
								var audioURL = "http://tts-api.com/tts.mp3?q="+encodeURIComponent(textInstructions);
								var audio_html = '<audio controls><source src="'+audioURL+'" type="audio/mpeg"></audio>';
								html += audio_html;
 								html += '</p>';

								html += '</div>';
								html += '</div>';
								html += '</div>';
							});
						});
					}
				});
			});
			callback(html, instructionStrings);
    	}//IF
	});
}

var getImageElement = function(lat, lng){
	var imageElement = "<h3><img src='";
	url = "https://maps.googleapis.com/maps/api/streetview?size=200x200&location="+lat+","+lng;
	console.log(url);
	imageElement = imageElement + url + "'></h3>"
	return imageElement;
}
