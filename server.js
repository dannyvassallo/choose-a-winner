var express = require('express'),
app = express(),
logger = require('morgan'),
path = require('path'),
fs = require('fs'),
CSV2JSON = require('./src/server/helpers/csv2json.js');
VIEWS_DIR = path.resolve(__dirname, './src/client/public/views');

// Set port for heroku deployment
var port = process.env.PORT || 8080;
// log with morgan
app.use(logger('dev'));
// Serve public assets
app.use(express.static(path.join(__dirname, './src/client/public')));

// GET home page
app.get('/', function(req, res) {
  res.sendFile(path.join(VIEWS_DIR, '/index.html'));
});

// CSV Routes
app.get('/csv', function(req, res) {
  var entries = [];
  fs.readFile('./test.csv', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    json = CSV2JSON.convert(data);
    res.status(200).json(json);
  });
});

app.listen(port, function() {
  console.log('Example app listening on port ' + port + '!');
});
