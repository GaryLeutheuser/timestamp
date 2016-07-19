var express = require('express');
var app = express();

app.get('/:date', function (req, res) {
  var dateObj = {};
  
  var input = req.params.date;
  var date;
  
  dateObj['unix'] = null;
  dateObj['natural'] = null;  
  
  // Input might be natural language.
  if (isNaN(input)) {
    date = new Date(input);
  } 
  // Input is in unix time.
  else {
    date = new Date(parseInt(input)*1000);
  }
  
  // If the date was not created properly, the input wasn't formatted properly.
  if (!isNaN(date.getTime())) {
    dateObj['unix'] = date.getTime()/1000;
    dateObj['natural'] = naturalDate(date);
  }
  
  res.end(JSON.stringify(dateObj));
});

app.listen(8080);

// Return a 'naturally' formatted date.
function naturalDate(date) {
  var dateString = getMonthString(date.getMonth()) + ' ';
  dateString += date.getDay() + ', ';
  dateString += date.getFullYear();
  
  return dateString;
}

// Returns the full name of a month from the integer value of the month.
function getMonthString(month) {
  var monthStrings = [
    'January',
    'Feburaury',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];
    
    if (month < 0 || month > 12) {
      return undefined;
    } else {
      return monthStrings[month];
    }
}