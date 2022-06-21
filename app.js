const express = require("express");
const app = express();
const https = require("http");

app.get("/", function(req, res){
    const url = "http://api.openweathermap.org/data/2.5/weather?q=Tampa,usa&units=imperial&appid=90cedd3136fdab5cc381234767da1b37";
    https.get(url, function(response){
console.log(response);
    });

    res.send("Server is up and running.");
});

app.listen(3000, function(){
    console.log("The server is running on Port 3000");
});