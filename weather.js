import express from "express";
const app = express();

//import node standard module https
import https from "https";

import path from "path";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bodyParser from "body-Parser"
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
      res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const apiKey = "56fb872fc07c63adb07807c94c7e0712";
  var query = req.body.cityName
  var country = req.body.countryCode
  const units = "metric"
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+","+country+"&appid="+apiKey+"&units="+units;
  //send get request on open weather api
  https.get(url, function(response) {
    console.log(response.statusCode);           //console.log(response.statusCode)  check the status respond
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);        //JSON.stringfy()
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const timezone = weatherData.timezone
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The weather in "+ query +" is currently " + des + "." + "</h1>");
      res.write("<h3>The temperature is " + temp + " degrees Celcius.</h3>");
      res.write("<img src =" + imageURL + ">");
      })
  })

})
app.listen (3000, function(){
  console.log("server is running now on 3000");
})
