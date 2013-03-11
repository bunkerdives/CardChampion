// get the main controller
var Login = require( './controllers/Login.js' );

// get the express object
app = module.parent.exports.app;


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
        templateName : JSON.stringify('limited')
        , options : JSON.stringify( { 'format' : 'sealed', 'set' : req.query['set'] } )
    } );
} );



app.post( '/login', Login.login );