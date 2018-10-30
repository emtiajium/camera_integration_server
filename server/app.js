var express = require('express');
var path = require('path');

var app = express();

// view engine setup

var rootDirectory = path.normalize(__dirname + '/../');
app.set('appPath', rootDirectory + 'client');

app.use(express.static(path.join(path.normalize(__dirname + '/../'), 'client')));

app.get('/', function (req, res) {
  res.sendFile(app.get('appPath') + '/index_home.html');
});

app.use(function (request, response, next) {
  if ('/robots.txt' === request.url || request.url.indexOf('robots.txt') >= 0) {
    response.type('text/plain');
    response.send('User-agent: *\nDisallow: /');
  }
  else if(request.method === 'OPTIONS'){
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
    response.send(200);
  }
  else {
    next();
  }
});

module.exports = app;


