// get the main controller
var Auth = require( './controllers/Auth.js' );
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var ProfileSchema = require('./schemas/ProfileSchema.js');
var DeckContainerSchema = require('./schemas/DeckContainerSchema.js');
var DeckDataSchema = require('./schemas/DeckDataSchema.js');

// get the express object
var app = module.parent.exports.app;
var database = module.parent.exports.database;
var passport = require('passport');

// '/' - show the main view to the user (right now it's recent decks)
app.get( '/', function(req, res) {
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    console.log("EXPRESS ROUTE '/'")
    
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    var DeckContainerModel = database.model( 'DeckContainer' );
    
    DeckContainerModel.find( {}, function(err, deckContainers){
        
        var decks = [];
        
        if( !err ){
            deckContainers.forEach( function( deckContainer, index ){
                decks[ index ] = deckContainer;
            } );
        }
        
        res.render( 'layout.jade', {
            templateName: JSON.stringify('Foyer')
            , options: JSON.stringify( {
                'subview' : 'Decks'
                , 'authOrGuest' : auth
                , 'user' : user
                , 'decks' : decks
            } )
        } );
        
    } );
    
} );


// '/splash' - show the user the splash view
app.get( '/splash', function(req, res) {
    
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
    
    console.log("EXPRESS ROUTE '/decks'")
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    var DeckContainerModel = database.model( 'DeckContainer' );
    
    DeckContainerModel.find( {}, function(err, deckContainers){
        
        var decks = [];
        
        if( !err ){
            deckContainers.forEach( function( deckContainer, index ){
                decks[ index ] = deckContainer;
            } );
        }
        
        res.render( 'layout.jade', {
            templateName: JSON.stringify('Foyer')
            , options: JSON.stringify( {
                'subview' : 'Decks'
                , 'authOrGuest' : auth
                , 'user' : user
                , 'decks' : decks
            } )
        } );
        
    } );
    
    
} );

// '/newevent' - show the Foyer view to the user with new event visible
app.get( '/newevent', function(req, res) {
    
    console.log("EXPRESS ROUTE '/newevent'")
    
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
    
    console.log("EXPRESS ROUTE '/draft'")
    
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
    
    console.log("EXPRESS ROUTE '/about'")
    
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
    
    console.log("EXPRESS ROUTE '/sealed'")
    
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


app.get( '/builder', function(req, res) {
    
    console.log("EXPRESS ROUTE '/builer'")
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    res.render( 'layout.jade', {
        templateName : JSON.stringify('Builder')
        , options : JSON.stringify( {
            'authOrGuest' : auth
            , 'user' : user
        } )
    } );
    
} );


app.get( '/decklists', function(req, res) {
    
    console.log("EXPRESS ROUTE '/decklists'")
    
    var username = req.query.user;
    var deckname = req.query.deck;
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    // get the profile object
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    mongoose.model( 'DeckData', DeckDataSchema, 'Decks' );
    
    var ProfileModel = database.model( 'Profile' );
    var DeckContainerModel = database.model( 'DeckContainer' );
    var DeckDataModel = database.model( 'DeckData' );
    
    ProfileModel.findOne( { user : username }, function(err, profile) {
        
        // get the deck data object from the database
        DeckContainerModel.find( { uTitle : deckname }, function(err, container) {
            
            // save the deck container object
            var deckContainer = container[0];
            
            // get the deck data ID from the container
            var deckDataId = container[0].deckDataId;
            
            // query the database for the deck container data
            DeckDataModel.findById( deckDataId, function(err, deckData) {
                
                // route the client to the profile page of the given user
                res.render( 'layout.jade', {
                    templateName : JSON.stringify('Foyer')
                    , options : JSON.stringify( {
                        'subview' : 'ProfileDeck'
                        , 'authOrGuest' : auth
                        , 'profile' : profile
                        , 'deckContainer' : deckContainer
                        , 'deckData' : deckData
                    } )
                } );
                
            } );
            
        } );
        
        
    } );
    
} );


app.get( '/:username', function( req, res ){
    
    console.log("EXPRESS ROUTE '/:username'")
    
    var username = req.params.username;
    switch( username ) {
        case 'null':
            return;
    }
    
    var auth = Auth.authOrGuest( req );
    var user = Auth.getUsernameOrNull( req );
    
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    
    var ProfileModel = database.model('Profile');
    var DeckContainerModel = database.model('DeckContainer');
    
    var numDeckContainers = 0;
    var numProcessedContainers = 0;
    
    ProfileModel.findOne( { user : username }, function(err, profile) {
        
        if( profile != null ) {
            
            numDeckContainers = profile.decks.length;
            
            profile.decks.forEach( function( deckContainerId, index ) {
            
                DeckContainerModel.findById( deckContainerId, function(err, deckContainer){
        
                    if( !err ){
                        profile.decks[ index ] = deckContainer;
                        ++ numProcessedContainers;
                    }
                    
                    if( numProcessedContainers == numDeckContainers ) {
                        // route the client to the profile page of the given user
                        res.render( 'layout.jade', {
                            templateName : JSON.stringify('Foyer')
                            , options : JSON.stringify( {
                                'subview' : 'ProfileDecks'
                                , 'authOrGuest' : auth
                                , 'username' : user
                                , 'user' : username
                                , 'profile' : profile
                            } )
                        } );
                    }
        
                } );
            
            } );
            
        }
        else{
            res.render( 'layout.jade', {
                templateName : JSON.stringify('Foyer')
                , options : JSON.stringify( {
                    'subview' : 'ProfileDecks'
                    , 'authOrGuest' : auth
                    , 'username' : user
                    , 'user' : username
                    , 'profile' : {}
                } )
            } );
        }
        
        
        
    } );
    
} );

app.post( '/profileSettingData', function(req, res) {
    
    console.log("profileSettingData")
    
    // if client is a guest, return error TODO check for Guest
    /*
    if( req.user == undefined ) {
        res.send("ERROR"); // TODO send error response
    }
    */
    
    console.log("profileSettingData SUCCESS")
    
    // get the username
    var user = req.session.username; // TODO unable to grab the username...
    
    console.log("User = " + user);
    
    // query the database for the user's profile object
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    var ProfileModel = database.model('Profile');
    
    ProfileModel.findOne( { user : user }, function( err, profile ){
        if( !err ) {
            console.log("Success fetching user " + user + "'s profile data" );
            
            // create a json object containing the full name, location, description, and profile image(thumb)
            var profileSettings = {
                fullName : profile.fullName
                , location : profile.location
                , description : profile.description
                , thumb : profile.thumb
                , thumbCardName : profile.thumbCardName
            }
    
            console.log("Sending profile settings data...")
            console.log(profileSettings)
    
            // respond to the client with this json object
            res.send( JSON.stringify( profileSettings ) );
            
        } else {
            console.log("Error fetching user data!");
        }
    } );
    
} );

app.post( '/editprofile', function(req, res) {
    
    // if client is a guest, return error //TODO make sure this or logic works
    if( req.session.username == undefined ) {
        res.send("Error!")
        return;
    }
    
    console.log("EDIT PROFILE!!!");
    
    // get the new profile settings from the post request
    var body = req.body;
    
    var thumb = body.thumb;
    var thumbCardName = body.thumbCardName;
    var fullName = body.fullName;
    var description = body.description;
    var location = body.location;
    
    // TODO check the new settings for validity
    
    
    var updateData = {};
    console.log("Updating profile with settings: ")
    console.log("thumb: " + thumb )
    console.log("thumbCardName: " + thumbCardName )
    console.log("fullName: " + fullName)
    console.log("description: " + description)
    console.log("location: " + location)
    
    // TODO add field verification (for security)
    
    if( thumb != undefined || thumb != '' ) {
        updateData['thumb'] = thumb;
    } if( thumbCardName != undefined || thumbCardName != '' ) {
        updateData['thumbCardName'] = thumbCardName;
    } if( fullName != undefined || fullName != '' ) {
        updateData['fullName'] = fullName;
    } if( description != undefined || description != '' ) {
        updateData['description'] = description;
    } if( location != undefined || location != '' ) {
        updateData['location'] = location;
    }
    
    // update the user's profile with the new settings
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    var ProfileModel = database.model('Profile');
    
    ProfileModel.update(
        { user : req.session.username }
        //, { $push : updateData }
        , updateData
        , { multi : true }
        //, { multi : true, upsert : true, safe : true }
        , function( error ) {
            console.log(error);
        }
    )
    
    // TODO return success
    res.send("Success!");
    
} );


app.post( '/newdeck', function(req, res) {
    
    // if client is a guest, return error
    if( req.user == undefined || req.user.username == 'Guest' ) {
        return; // TODO send error response
    }
    
    // get the new deck name and deck data from the request
    var body = JSON.parse( req.body );
    var deckName = body.deckName;
    var deckData = body.deckData;
    
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    mongoose.model( 'DeckData', DeckDataSchema, 'Decks' );
    
    var DeckContainerModel = database.model('DeckContainer');
    var DeckDataModel = database.model('DeckData');
    
    // check if the user has an existing deck with the same name, if so, return an error
    
    // create a new deck object and store in the decks collection
    
    // add a reference to the deck document in the user's profile document
    
    
} );


app.post( '/savedeck', function(req, res) {
    
    // if client is a guest, return error
    if( req.user == undefined || req.user.username == 'Guest' ) {
        return; // TODO send error response
    }
    
    // get the deck name and deck data from the request
    var body = JSON.parse( req.body );
    var deckName = body.deckName;
    var deckData = body.deckData;
    
    // check if the deck exists for this user, if not, return an error
    var DeckContainerModel = database.model('DeckContainer');
    var DeckDataModel = database.model('DeckData');
    
    // update the deck data for the user
    
    
} );



app.post( '/register', Auth.register );

app.post( '/login', passport.authenticate('local'), Auth.login );
