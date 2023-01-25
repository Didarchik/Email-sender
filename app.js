const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const email = req.body.email;
    const password = req.body.password
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
            }

        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/65d4eab37b/";

    const options = {
        method: "POST",
        auth: "didar:c86a67094729d1e817d4bbc4935e0b30-us21"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        console.log(response.statusCode);
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    })
    request.write(jsonData);
    request.end();
})


//API key: 39992c20378ed6f76a2281161057646c-us21
//list id: 65d4eab37b

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has been started on port 3000!");
})