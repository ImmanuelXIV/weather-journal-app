/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const linkUrl = ',us&appid='
const apiKey = 'xxxxxxxxxxxYourAPIKeyHerexxxxxx&units=metric'; 
                

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add Event Listener
const gen = document.getElementById('generate');

// Make async GET request to the OpenWeatherMap API
gen.addEventListener('click', function() {
    let zip = document.getElementById('zip').value;
    if (is5Zip(zip)) {
        getWeatherData(zip) 
        .then(function(data) {
            postData('http://localhost:9000/postWeatherData', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: document.getElementById('feelings').value,
            });
        })
        .then(function() {
            updateEntry();
        });
    }
    else {
        console.log(`Not a valid 5 digit zip code: ${zip}`);
    }
});

// Only allow 5 digit zip codes
const is5Zip = function(zip) {
    regEx = /^[0-9]{5}/;
    return regEx.test(zip);
}

// Make async GET req to OpenWeatherMap API
const getWeatherData = async function(zip) {
    const res = await fetch(baseUrl + zip + linkUrl + apiKey);
    try {
        return await res.json();
    }
    catch(err) {
        console.log(`An error occurred: ${err}`);
    }
}

// Make async POST req to 
const postData = async function(url='', data={}) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        return await res.json();
    }
    catch(err) {
        console.log(`An error occurred while POSTing: ${err}`);
    }
};

// Update the UI
const updateEntry = async function() {
    const req = await fetch('http://localhost:9000/getProjectData');
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temperature;
        document.getElementById('content').innerHTML = data.userResponse;
    }
    catch(err) {
        console.log(`An error occured while updating the UI ${err}`);
    }
};