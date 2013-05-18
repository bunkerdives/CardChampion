var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = module.exports = require('socket.io').listen(server);
var mongoose = require('mongoose');
var passport = require('passport');
var passportSocketIo = require("passport.socketio");
var LocalStrategy = require('passport-local').Strategy;
var connect = require('connect');
var sessionStore    = new connect.session.MemoryStore();
var sessionSecret  = 'lospolloshermanos';
var sessionKey    = 'test-session-key';
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
    app.set( 'public', __dirname + '/public' );

    app.use( express.logger() );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    
    app.use( express.cookieParser() );
    app.use( express.session(sessionOptions) );
    
    app.use( passport.initialize() );
    app.use( passport.session() );
    
    app.use( app.router );
    
} );

// TODO set these up for real
app.configure( 'development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
} );
// TODO set these up for real
app.configure( 'production', function() {
    app.use(express.errorHandler());
} );


// Configure passport
var Account = require('./models/Account.js');
passport.use( new LocalStrategy( Account.authenticate() ) );
passport.serializeUser( Account.serializeUser() );
passport.deserializeUser( Account.deserializeUser() );

// Connect to the MongoDB database
var database = mongoose.connect('mongodb://localhost/CardChampion');

module.exports.app = app;
module.exports.server = server;
module.exports.passport = passport;
module.exports.passportSocketIo = passportSocketIo;
module.exports.mongoose = mongoose;
module.exports.database = database;
module.exports.sessionStore = sessionStore;
module.exports.sessionOptions = sessionOptions;
module.exports.io = io;


// setup routers
require('./routes/SealedRouter.js').init(app);
require('./routes/AboutRouter.js').init(app);
require('./routes/AuthRouter.js').init(app);
require('./routes/BuilderRouter.js').init(app);
require('./routes/CardRouter.js').init(app);
require('./routes/ChatRouter.js').init(app);
require('./routes/DecksRouter.js').init(app);
require('./routes/IndexRouter.js').init(app);
require('./routes/ProfileRouter.js').init(app);
require('./routes/SplashRouter.js').init(app);

server.listen(80);

var sockets = require('./sockets');