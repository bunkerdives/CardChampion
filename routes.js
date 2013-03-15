// get the main controller
var Auth = require( './controllers/Auth.js' );

// get the express object
app = module.parent.exports.app;
passport = require('passport');


// '/' - show the Splash view to the user
app.get( '/', function(req, res) {
    
    var authOrGuest = true;
    if( req.session.authOrGuest == undefined ) {
        authOrGuest = false;
    }
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Splash')
        , options: JSON.stringify( {
           'authOrGuest' : authOrGuest 
        } )
        
    } );
} );


// '/decks' - show the Foyer view to the user with decks visible
app.get( '/decks', function(req, res) {
    
    var authOrGuest = true;
    if( req.session.authOrGuest == undefined ) {
        authOrGuest = false;
    }
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Decks')
        , options: JSON.stringify( {
           'authOrGuest' : authOrGuest 
        } )
    } );
} );

// '/newevent' - show the Foyer view to the user with new event visible
app.get( '/newevent', function(req, res) {
    
    var authOrGuest = true;
    if( req.session.authOrGuest == undefined ) {
        authOrGuest = false;
    }
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('NewEvent')
        , options: JSON.stringify( {
           'authOrGuest' : authOrGuest 
        } )
        
    } );
} );

// '/draft' - show the Foyer view to the user with new draft visible
app.get( '/draft', function(req, res) {
    
    var authOrGuest = true;
    if( req.session.authOrGuest == undefined ) {
        authOrGuest = false;
    }
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Draft')
        , options: JSON.stringify( {
           'authOrGuest' : authOrGuest 
        } )
        
    } );
} );

// '/about' - show the Foyer view to the user with new draft visible
app.get( '/about', function(req, res) {
    
    var authOrGuest = true;
    if( req.session.authOrGuest == undefined ) {
        authOrGuest = false;
    }
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('About')
        , options: JSON.stringify( {
           'authOrGuest' : authOrGuest 
        } )
    } );
} );


// '/sealed/:set' - show the Sealed View with the specified set to the user
app.get( '/sealed', function(req, res) {
    
    var authOrGuest = true;
    if( req.session.authOrGuest == undefined ) {
        authOrGuest = false;
    }
    
    res.render( 'layout.jade', {
        templateName : JSON.stringify('Limited')
        , options : JSON.stringify( { 'authOrGuest' : authOrGuest, 'format' : 'sealed', 'set' : req.query['set'] } )
    } );
} );


app.get( '/:username', function(req, res){
    
    var authOrGuest = true;
    if( req.session.authOrGuest == undefined ) {
        authOrGuest = false;
    }
    
    // route the client to the profile page of the given user
    res.render( 'layout.jade', {
        templateName : JSON.stringify('Profile')
        , options : JSON.stringify( { 'authOrGuest' : authOrGuest, 'username' : req.params.username } )
    } );
} );


app.post( '/register', Auth.register );
app.post( '/login', passport.authenticate('local'), Auth.login );
app.post( '/guest', Auth.guest );