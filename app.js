var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = module.exports = require('socket.io').listen(server);

var mongoose = require('mongoose');
var passport = require('passport');
var passportSocketIo = require("passport.socketio");

var connect = require('connect');

var LocalStrategy = require('passport-local').Strategy;

var sessionSecret  = 'SaulGoodman';
var sessionKey    = 'express.sid';

//var sessionStore    = new connect.session.MemoryStore( { key : sessionKey } );
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();

var sessionOptions = {
    store:  sessionStore,
    key:    sessionKey,
    secret: sessionSecret
};

app.configure( function(){
    
    app.use( express.static(__dirname + '/public') );
    app.use( express.static(__dirname + '/views') );
    app.use( express.bodyParser() );
    app.set( 'views', __dirname + '/views' );
    app.set( '/public', __dirname + '/public' );

    app.use( express.logger() );
    app.use( express.bodyParser() );
    
    app.use( express.cookieParser() );
    app.use( express.session(sessionOptions) );
    
    app.use( express.methodOverride() );

    app.use( passport.initialize() );
    app.use( passport.session() );
    
    app.use( express.cookieParser() );
    app.use( app.router );
    
} );

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


// Configure passport
var Account = require('./models/Account.js');

passport.use( new LocalStrategy(Account.authenticate()) );

passport.serializeUser( Account.serializeUser() );
passport.deserializeUser( Account.deserializeUser() );

// Connect mongoose
var database = mongoose.connect('mongodb://localhost/LimitedMTG');

server.listen(3000);

module.exports.app = app;
module.exports.server = server;
module.exports.database = database;
module.exports.passport = passport;
module.exports.passportSocketIo = passportSocketIo;
module.exports.sessionStore = sessionStore;
module.exports.sessionOptions = sessionOptions;
module.exports.io = io;

var routes = require('./routes');
var sockets = require('./sockets');