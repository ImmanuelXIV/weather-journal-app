// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express, Body-Parser, and Cors to run server and routes
// For installation instructions see README.md
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

// Middleware
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 9000;
const server = app.listen(port, serverRunning);

function serverRunning() {
    console.log(`Server is running on localhost: ${port}`);
};

// GET route
app.get('/getProjectData', function(req, resp) {
    resp.send(projectData);
});

// POST route
app.post('/postWeatherData', function(req, resp) {
    projectData["temperature"] = req.body.temperature;
    projectData["date"] = req.body.date;
    projectData["userResponse"] = req.body.userResponse;
});