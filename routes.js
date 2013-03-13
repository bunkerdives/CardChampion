// get the main controller
var Auth = require( './controllers/Auth.js' );

// get the express object
app = module.parent.exports.app;
passport = require('passport');


// '/' - show the Splash view to the user
app.get( '/', function(req, res) {
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Splash')
        , options: JSON.stringify('')
    } );
} );


// '/foyer' - show the Foyer view to the user
app.get( '/foyer', function(req, res) {
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify('')
    } );
} );


// '/sealed/:set' - show the Sealed View with the specified set to the user
app.get( '/sealed', function(req, res) {
    res.render( 'layout.jade', {
        templateName : JSON.stringify('Limited')
        , options : JSON.stringify( { 'format' : 'sealed', 'set' : req.query['set'] } )
    } );
} );


app.get( '/:username', function(req, res){
    // route the client to the profile page of the given user
    res.render( 'layout.jade', {
        templateName : JSON.stringify('Profile')
        , options : JSON.stringify( { 'username' : req.params.username } )
    } );
} );


app.post( '/register', Auth.register );
app.post( '/login', passport.authenticate('local'), Auth.login );