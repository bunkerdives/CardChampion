// get the main controller
var Splash = require( './controllers/Splash.js' );
var Login = require( './controllers/Login.js' );

// get the express object
app = module.parent.exports.app;

app.get( '/', Splash.index );
app.post( '/Login', Login.login );