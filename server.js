// define variable for the npm module we're using, a port, and the app itself.
var connect = require('connect');
var url = require('url');
var port = 3000;
var app = connect();

// Create math function to handle operations
function math(method, x, y) {
    var returnValue = null;
    if (isNaN(x) || isNaN(y))
        return returnValue = 'Please enter appropriate values';

    switch (method) {
        case 'add':
            returnValue = x + " + " + y + " = " + (x + y);
            break;
        case 'subtract':
            returnValue = x + " - " + y + " = " + (x - y);
            break;
        case 'divide':
            returnValue = x + " / " + y + " = " + (x / y);
            break;
        case 'multiply':
            returnValue = x + " * " + y + " = " + (x * y);
            break;
        default:
            returnValue = 'Please enter an appropriate method';
    }
    return returnValue;
}

// A function to handle the /lab3 route 
var lab3 = function(req, res) {
    // gather parameteres from requested url, create variables
    var parameters = url.parse(req.url, true).query;
    var method, x, y = null;
    // check if parameters are there and not null
    (parameters['method'] !== null) ? method = parameters['method']: method = 'n/a';
    (parameters['x'] !== null) ? x = parameters['x']: x = 'n/a';
    (parameters['y'] !== null) ? y = parameters['y']: y = 'n/a';
    // construct the output from the variables supplied and the math function created
    var output = math(method, x, y);
    // send a response
    res.end(output);
}

app.use('/lab3', lab3);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});