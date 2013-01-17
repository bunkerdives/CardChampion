var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = module.exports = require('socket.io').listen(server);

app.use( express.static(__dirname + '/public') );
app.use( express.bodyParser() );
app.set( 'views', __dirname + '/views' );

server.listen(3000);

module.exports.app = app;
module.exports.io = io;

var routes = require('./routes');
var sockets = require('./sockets');