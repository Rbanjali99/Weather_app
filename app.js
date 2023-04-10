const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true})); 

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
   
});
app.post("/",function(req,res){
    
    const appikey = "61b865b8abc2373d24d2440e46aa876a"
    const place = req.body.cityname;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + appikey + "&units=" + unit ;
    
    https.get(url,function(response){
        
        response.on("data", function(data){
        const weatherdata = JSON.parse(data)
        const temp = weatherdata.main.temp
        const icon = weatherdata.weather[0].icon
        const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        const weatherdesc = weatherdata.weather[0].description
      //console.log(weatherdesc);
      //console.log(temp);
        res.write("<p>The weather is "+weatherdesc + " there </p>");
        res.write("<h1>the temp in " + place +" is "+ temp + " degrees celcius.</h1>");
        res.write("<img src = " + imageurl + ">");
        res.send();
        })

    })
})


app.listen(3000,function(){
    console.log("Server is running on 3000 post");
})