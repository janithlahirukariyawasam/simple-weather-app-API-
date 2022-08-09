const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (require, response) {
    response.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, resi) {
    let lon = req.body.Lon;
    let lat = req.body.Lat;
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=c46de16d49ed27ef177fe97967264f26&units=metric";
    https.get(url, function (res) {
        res.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            

            resi.send("<center><h1> Tempreture is " + temp + "</h1><br><h1> Weather description " + des + "</center>");
            console.log("weather is " + temp);
            console.log("weather description is " + des);

        })
        console.log(res.statusCode);
    });

})

app.listen(3000, function () {
    console.log("Server is started......");
})


/* const lat = 6.927079;
    const lon = 79.861244;

    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=c46de16d49ed27ef177fe97967264f26&units=metric";
    https.get(url,function(res){
        res.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            //putting the details to website
            /*

                    response.write("hello temp is ")
                    response.write("wathe des....")
                    response.send();


            
                    response.send("<center><h1> Tempreture is " + temp + "</h1><br><h1> Weather description " + des + "</center>");
                    console.log("weather is " + temp);
                    console.log("weather description is " + des);
            
                })
                console.log(res.statusCode);
            }); //https link ekak wenna ona api link eka
           // response.send("Server is running .....");*/