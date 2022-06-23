// Creates an Express Application
const express = require("express");

// Requesting the https Module & Body Parser Module
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

// Reqired to parse through the body of the ".post" request
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    // Set Variables & The URL Gets Us Live Data Using an API
    // "query" captures dynamic data based on what the user typed into the input, "cityName", in the index.html file 
    const query = req.body.cityName;
    const apiKey = "90cedd3136fdab5cc381234767da1b37"
    const unit = "imperial";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query},usa&units=${unit}&appid=${apiKey}`;

    // Making an "https" Get Request
    https.get(url, function(response){
        console.log(response.statusCode);

        // Taps into a Specific Moment, in this Instance, "data"
        response.on("data", function(data){

            // "weatherData" Receives The "data" Parameter and Places the Data in a JSON Format
            const weatherData = JSON.parse(data);

            // Fetching the Specific Items Wanted
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

            // Sending The Specific Items Requested Back to The Browser Using HTML 
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Fahrenheit, with ${weatherDiscription}.</h1>`);
            res.write(`<img src="${imageURL}">`)
            res.send();
        });
    });
})



// app.listen() is Used to Bind & Listen To The Connections on a Specified Host & Port
app.listen(3000, function(){
    console.log("The server is running on Port 3000");
});