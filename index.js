const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

     var firstname = req.body.fname;
     var lastname = req.body.lname
     var Email = req.body.email

     var data = {
        members: [
            { 
                email_address : Email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstname,
                    LNAME : lastname,
                }
            }
        ]
     }
     var jsonData = JSON.stringify(data);

     const url = "https://us18.api.mailchimp.com/3.0/lists/857af5a0f1"

     const options = {
        method : "POST",
        auth : "williams1:03a8f466f9ba2e282dc86ec283c5fcb9-us18",
     }

     const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
     })
     request.write(jsonData);
     request.end();
});

app.post("/failure.html", function(req, res){
    res.redirect("/");
})

app.listen(10000, function(){
    console.log("server is running in port 8080");
});
