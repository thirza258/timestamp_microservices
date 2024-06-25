// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  
  try {
    let dateObject;

    // Check if dateParam is undefined or empty
    if (!dateParam) {
      // If dateParam is not provided, use the current date
      dateObject = new Date();
    } else {
      // Attempt to create a Date object from the provided date string or timestamp
      if (/^\d+$/.test(dateParam)) {
        // If dateParam is a valid Unix timestamp (all digits)
        dateObject = new Date(parseInt(dateParam));
      } else {
        // Otherwise, try to create a Date object from the dateParam string
        dateObject = new Date(dateParam);
      }
    }

    // Check if the dateObject is invalid
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid Date");
    }

    // Return JSON response with Unix timestamp and UTC string
    res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
  } catch (error) {
    // Handle errors, return JSON response with error message
    res.json({ error: "Invalid Date" });
  }
});


app.get("/api", function (req, res) {
  let dateObject = new Date();
  res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
})

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
