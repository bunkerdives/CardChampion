// get the main controller
var Auth = require( './controllers/Auth.js' );
var mongoose = require('mongoose');

var ProfileSchema = require('./schemas/ProfileSchema.js');

// get the express object
app = module.parent.exports.app;
database = module.parent.exports.database;
passport = require('passport');

// '/' - show the Splash view to the user
app.get( '/', function(req, res) {
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Splash')
        , options: JSON.stringify( {
            'authOrGuest' : auth
            , 'user' : user
        } )
        
    } );
} );


// '/decks' - show the Foyer view to the user with decks visible
app.get( '/decks', function(req, res) {
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            'subview' : 'Decks'
            , 'authOrGuest' : auth
            , 'user' : user
        } )
    } );
} );

// '/newevent' - show the Foyer view to the user with new event visible
app.get( '/newevent', function(req, res) {
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            'subview' : 'NewEvent'
            , 'authOrGuest' : auth
            , 'user' : user
        } )
        
    } );
} );

// '/draft' - show the Foyer view to the user with new draft visible
app.get( '/draft', function(req, res) {
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            'subview' : 'Draft'
            , 'authOrGuest' : auth
            , 'user' : user
        } )
        
    } );
} );

// '/about' - show the Foyer view to the user with new draft visible
app.get( '/about', function(req, res) {
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            'subview' : 'About'
            , 'authOrGuest' : auth
            , 'user' : user
        } )
    } );
    
} );


// '/sealed/:set' - show the Sealed View with the specified set to the user
app.get( '/sealed', function(req, res) {
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    res.render( 'layout.jade', {
        templateName : JSON.stringify('Limited')
        , options : JSON.stringify( {
            'authOrGuest' : auth
            , 'format' : 'sealed'
            , 'set' : req.query['set']
            , 'user' : user
        } )
    } );
    
} );

app.get( '/decklist', function(req, res) {
    
    
    console.log("deckName callback begin")
    
    var username = req.query.user;
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    // get the deck object
    var deckCardData = Auth.newDeckList();
    
    // get the profile object
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    var ProfileModel = database.model('Profile');
    ProfileModel.findOne( { user : username }, function(err, doc) {
        
        // route the client to the profile page of the given user
        
        res.render( 'layout.jade', {
            templateName : JSON.stringify('Foyer')
            , options : JSON.stringify( {
                'subview' : 'DeckList'
                , 'authOrGuest' : auth
                , 'username' : user
                , 'user' : username
                , 'profile' : doc
                , 'deckData' : deckCardData
            } )
        } );
        
        console.log("FOUND ONE!!!!!!!!")
        
        
    } );
    
} );


app.get( '/:username', function(req, res, next){
    
    if( req.params.username == 'decks' ){
        return;
    }
    
    if( req.params.deckId ) {
        console.log("Invalid /:username !");
        next();
    }
    
    var username = req.params.username;
    switch( username ) {
        case 'null':
            return;
    }
    
    console.log('\n\n/:username\n\n');
    console.log(req.params.username)
    
    var deckCardData = Auth.newDeckList();
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    
    var ProfileModel = database.model('Profile');
    ProfileModel.findOne( { user : username }, function(err, doc) {
        
        // route the client to the profile page of the given user
        res.render( 'layout.jade', {
            templateName : JSON.stringify('Foyer')
            , options : JSON.stringify( {
                'subview' : 'Profile'
                , 'authOrGuest' : auth
                , 'username' : user
                , 'user' : username
                , 'profile' : doc
            } )
        } );
        
    } );
    
} );






app.post( '/register', Auth.register );
app.post( '/login', passport.authenticate('local'), Auth.login );
app.post( '/guest', passport.authenticate('local'), Auth.guest );