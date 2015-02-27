var express = require('express');
var app = express();
var request = require('request');
var msTranslator = require('mstranslator');

require('./streetView.js');

app.get('/', function(req, res){
    //get the parameter for start and end locations:
    var start = req.query.start;
    var end = req.query.end;
    var method = req.query.method || "walking"; //default to 'walking' to target

    // Route URL:
    var routeURL = "https://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(start)+
        "&destination="+encodeURIComponent(end)+"&mode="+method+"&key=AIzaSyCf2AEb5wOD8riXjDWtWLuFkYd5hHuvSX4";
    // Generate HTML
    getHTMLContent(routeURL, function (html){
     res.send(html);
    });

});

app.listen(3000);