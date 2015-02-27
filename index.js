var express = require('express');
var app = express();
var request = require('request');
var msTranslator = require('mstranslator');
var cheerio = require("cheerio");
var _ = require('underscore');
var fs = require('fs');

$ = cheerio.load(fs.readFileSync('./index.html'));

// Variable containing secrets, should contain at least:
// {
//     microsoft: {
//         client_id: "replace_with_ms ID",
//         client_secret: "replace with ms client secret"
//     },
//     google: {
//         key: "google API key goes here"
//     }
// }
require("./APISecrets.js");

require('./streetView.js');

// Translation related Language parameters:
var fromLang = "en",
    toLang = "zh";

//set up translator
var client = new msTranslator({
  client_id: APISecrets.microsoft.client_id,
  client_secret: APISecrets.microsoft.client_secret
}, true);


app.get('/', function(req, res){
    //get the parameter for start and end locations:
    var start = req.query.start;
    var end = req.query.end;
    var method = req.query.method || "walking"; //default to 'walking' to target

    // Route URL:
    var routeURL = "https://maps.googleapis.com/maps/api/directions/json?origin="+encodeURIComponent(start)+
        "&destination="+encodeURIComponent(end)+"&mode="+method+"&key="+APISecrets.google.key;
    console.log(routeURL);

    // Generate HTML
    getHTMLContent(routeURL, function (html, instructionStrings) {
        $("#step_content").html(html);
        // console.log(instructionStrings);
        //translate all instructions
        // res.send($.html());
        client.translateArray({texts: instructionStrings, from: fromLang, to: toLang}, function(err, data) {
            var translationEls = $(".translation");

            _.each(data, function (val, index) {
                // console.log("bla"+$(translationEls[index]).html());
                $(translationEls[index]).html("("+val.TranslatedText+")");
            });

            res.send($.html());
        });
    });
});

app.listen(3000);