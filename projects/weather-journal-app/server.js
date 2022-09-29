// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(require("cors")());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(8000,()=>{
    console.log("server running"); 
    console.log(`running on localhost: 8000`);
});

// GET Route Setup
app.get("/get",(req,res)=>{res.send(projectData)});

// POST Route Setup
app.post("/post",(req,res)=>{
    const data = {
        temp: req.body.temp,
        feel: req.body.feel,
        date: req.body.date
    }
    console.log(data);
    projectData[data.date] = data;
});