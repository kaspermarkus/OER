var express = require('express');
var app = express();
var request = require('request');
var msTranslator = require('mstranslator');

require('./streetView.js');


    // // Second parameter to constructor (true) indicates that
    // // the token should be auto-generated.
    // var client = new MsTranslator({
    //   client_id: "your client_id"
    //   , client_secret: "your client secret"
    // }, true);

    // var params = {
    //   text: 'How\'s it going?'
    //   , from: 'en'
    //   , to: 'es'
    // };

    // // Don't worry about access token, it will be auto-generated if needed.
    // client.translate(params, function(err, data) {
    //       console.log(data);
    // });

app.get('/', function(req, res){
    //get the parameter for start and end locations:
    var start = req.query.start;
    var end = req.query.end;
    var method = req.query.method || "walking"; //default to 'walking' to target

    // Route URL:
    var routeURL = "https://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(start)+
        "&destination="+encodeURIComponent(end)+"&key=AIzaSyCf2AEb5wOD8riXjDWtWLuFkYd5hHuvSX4";

    console.log(routeURL);

    // Generate HTML
    getHTMLContent(routeURL, function (html){
     res.send(html);
    });


    // Translation related Language parameters:
    // var fromLang = "en",
    //     toLang = "zh";

    // console.log(JSON.stringify(req.query));

    // //set up translator
    // var client = new msTranslator({
    //   client_id: "OER",
    //   client_secret: "iCjexcXNhME+t9rOhdz7WribW+n8Pn0p207O7DpQMvA="
    // }, true);

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
});

app.listen(3000);