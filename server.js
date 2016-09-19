var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');
var VIEWS_DIR = path.resolve(__dirname, './src/client/public/views');

// Set port for heroku deployment
var port = process.env.PORT || 8080;
app.use(logger('dev'));


/* GET home page. */
app.get('/', function (req, res) {
  res.sendFile(path.join(VIEWS_DIR ,'/index.html'));
});

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
