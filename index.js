var express = require('express');
var app = express();
var request = require('request');


app.get('/', function(req, res){
   request("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCf2AEb5wOD8riXjDWtWLuFkYd5hHuvSX4", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            res.send(body);
        }
    });
});

app.listen(3000);