// get the main controller
var splash = require( './controllers/Splash.js' );
var login = require( './controllers/Login.js' );
var register = require( './controllers/Register.js' );

// get the express object
app = module.parent.exports.app;

app.get( '/', splash.index );
app.post( '/Login', login.login );
app.post( '/Register', register.register );