const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const request = require("request");
const { json } = require("body-parser");

const app = express();

// to load static pages 
app.use(express.static("public"));

// to get data which was enter by user ** bodyparser ** ismust 
app.use(bodyParser.urlencoded({textended : true}));

//get the html file 
app.get("/" ,function (req ,res){
res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req ,res){
    // creating the variables to save the content enter by user 
const fristName = req.body.fName;
 const lastName = req.body.lName;
 const email = req.body.email;

 //creating object 
 const  data = {
 members:[
{
    email_address:email,
    status :"subscribed" ,
    merge_field :{
 
     FNAME : fristName  ,
     LNAME : lastName 
 
    }
}
]
 };
 //truning these data into JSON format
 const jsonData =JSON.stringify(data);

 const url ="https://us7.api.mailchimp.com/3.0/lists/52eb56c0d9" ;

 const options = {
  method : "POST",
  auth : "mansi1:fc54ecd60edb7265d8c5d12210e65260-us7"
 }

 

 const request = https.request(url ,options ,function (response) {

    
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } 
    else{
        res.sendFile(__dirname + "/faillure.html");
    }

     response.on("data" , function (data) {
     console.log(JSON.parse(data));    
     })
 })
 request.write(jsonData);
 request.end();

});

// to redirect to sign up page from failure
app.post("/failure", function(req ,res) {
    res.redirect("/")
});

// process.env.PORT use to run web site on server horeku as well local 3000 
app.listen( process.env.PORT || 3000 , function(){
    console.log("server is running on port 3000");

})



//API key 
//fc54ecd60edb7265d8c5d12210e65260-us7

