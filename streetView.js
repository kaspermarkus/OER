var express = require('express');
var app = express();
var request = require('request');
var _ = require('underscore');

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
	var inc = 0;
	   request(url, function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            var parsedJSON = JSON.parse(body);
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
									html += "<h2>" + step.html_instructions + "</h2>";
									lat = step.end_location.lat;
									lng = step.end_location.lng;
									html = html + getImageElement(lat, lng);
								});
								//console.log(html);
							});
						}
					});
				});
			callback(html);
	    	}//IF
		});
}

var getImageElement = function(lat, lng){
	var imageElement = "<h3><img src='"
	url = "https://maps.googleapis.com/maps/api/streetview?size=200x200&location="+lat+","+lng+"&heading=235";
	imageElement = imageElement + url + "'></h3>"
	return imageElement;
}