// get the main controller
var Auth = require( '../dev/controllers/Auth.js' );
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var DeckContainerModel = require('./models/DeckContainerModel.js');
var DeckDataModel = require('./models/DeckDataModel.js');

var ProfileSchema = require('./schemas/ProfileSchema.js');
var DeckContainerSchema = require('./schemas/DeckContainerSchema.js');
var DeckDataSchema = require('./schemas/DeckDataSchema.js');

var BoosterPack = require('./utils/BoosterPack.js');
var SetController = require('./utils/SetController.js')

// get the express object
var app = module.parent.exports.app;
var database = module.parent.exports.database;
var passport = require('passport');

var $ = require('jQuery');

var MultiverseToCardMap = require('./utils/MultiverseToCardMap.js')

var routeFrontendWithOptions = function( res, template, options ) {
    res.render( 'layout.jade', {
        templateName : JSON.stringify( template )
        , options : JSON.stringify( options )
    } );
};

// '/' - show the main view to the user (right now it's recent decks)
app.get( '/', function(req, res) {
    
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    database.model( 'DeckContainer' ).find( {}, function(err, deckContainers){
        
        var decks = [];
        if( !err ){
            deckContainers.forEach( function( deckContainer, index ){
                decks[ index ] = deckContainer;
            } );
        }
        
        res.render( 'layout.jade', {
            templateName: JSON.stringify('Foyer')
            , options: JSON.stringify( {
                subview : 'Decks'
                , auth : Auth.getAuthority( req )
                , decks : decks
            } )
        } );
        
    } );
    
} );


app.get( '/recentchat', function(req, res) {
    var recentChat = Chat.lastTenMessages();
    res.send( { status : 'Success', data : lastTenMessages } );
} );


// '/splash' - show the user the splash view
app.get( '/splash', function(req, res) {
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Splash')
        , options: JSON.stringify( {
            auth : Auth.getAuthority( req )
        } )
    } );
} );

app.get( '/card', function(req, res) {
	
	var multiverse = req.query.multiverse;
	
	// get the card meta data TODO test if the multiverse is not valid
	var cardMetaData = MultiverseToCardMap[ multiverse ];
	
	var set = cardMetaData.set;
	var cardnum = cardMetaData.cardnum;
	
	// get the card data
	var setObj = SetController.getSet( set );
	var cardData = setObj.card_data[cardnum];
	
	// TODO add set name and set total to response data
	var setTotal = Object.keys( setObj.card_data ).length;
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            subview : 'Card'
            , auth : Auth.getAuthority( req )
            , cardData : cardData
			, set : setObj.set
			, setAbbr : set
			, cardnum : cardnum
			, setTotal : setTotal
        } )
    } );
	
} );

app.get( '/cardData', function(req,res) {
	
	var multiverse = req.query.multiverse;
	
	// get the card meta data TODO test if the multiverse is not valid
	var cardMetaData = MultiverseToCardMap[ multiverse ];
	console.log("cardMetaData: " + cardMetaData);
	var set = cardMetaData.set;
	var cardnum = cardMetaData.cardnum;
	
	// get the card data
	var setObj = SetController.getSet( set );
	var cardData = setObj.card_data[cardnum];
	
	// send the card data to the client
	sendData = {
		status : "Success"
		, cardData : cardData
	};
	res.send( sendData );
	
} );


// '/decks' - show the Foyer view to the user with decks visible
app.get( '/decks', function(req, res) {
    
    // TODO filter private decks; select format
    
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    database.model( 'DeckContainer' ).find( {}, function(err, deckContainers) {
        
        if( !err ){
            var decks = [];
            deckContainers.forEach( function( deckContainer, index ){
                console.log(deckContainer._id)
                decks[ index ] = deckContainer;
            } );
            // direct the user to the decks page
            res.render( 'layout.jade', {
                templateName: JSON.stringify('Foyer')
                , options: JSON.stringify( {
                    subview : 'Decks'
                    , auth : Auth.getAuthority(req)
                    , decks : decks
                } )
            } );
        }
        else {
            res.send( { status : 'Error' } );
        }
        
    } );
    
} );

// '/newevent' - show the Foyer view to the user with new event visible
app.get( '/newevent', function(req, res) {
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            subview : 'NewEvent'
            , auth : Auth.getAuthority(req)
        } )
    } );
} );

// '/draft' - show the Foyer view to the user with new draft visible
app.get( '/draft', function(req, res) {
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            subview : 'Draft'
            , auth : Auth.getAuthority( req )
        } )
    } );
} );

// '/about' - show the Foyer view to the user with new draft visible
app.get( '/about', function(req, res) {
    res.render( 'layout.jade', {
        templateName: JSON.stringify('Foyer')
        , options: JSON.stringify( {
            subview : 'About'
            , auth : Auth.getAuthority( req )
        } )
    } );
} );


app.get( '/sealed/:pack1/:pack2/:pack3/:pack4/:pack5/:pack6', function(req, res) {
	
	console.log("********")
	console.log("/sealed/:pack1/:pack2/:pack3/:pack4/:pack5/:pack6")
	console.log("********")
	
	var params = req.params;
	
	var boosters = [];
	for( var i = 0; i < 7; ++i ) {
		if( ! SetController.validSet( set ) ) {
			packNum = 'pack' + i;
			var packSet = params[packNum];
			var booster = BoosterPack.newBooster(packSet);
			if( booster != null ) {
				$.merge( boosters, booster );
			} else {
				res.send( 'Invalid sealed data!', 501 );
			}
		} else {
			res.send( 'Invalid sealed data!', 501 );
		}
	}
	
	// route the user to the sealed screen, and pass it the six packs of cards
    res.render( 'layout.jade', {
		status : 200
        , templateName : JSON.stringify('Limited')
        , options : JSON.stringify( {
            format : 'Sealed'
			, boosters : boosters
            , auth : Auth.getAuthority( req )
        } )
    } );
	
} );


// '/sealed/:set' - show the Sealed View with the specified set to the user
app.get( '/sealed', function(req, res) {
	
    //var set = req.params.set;
	var set = req.query.set;
	
	// check to make sure the set provided is valid
	if( ! SetController.validSet(set) ) {
		res.send( 'Invalid set!', 501 );
	}
	
	var boosters = [];
	
	// create the six packs, randomly
	for( var i = 0; i < 6; ++i ) {
		var booster = BoosterPack.newBooster(set);
		if( booster != null ) {
			$.merge( boosters, booster );
		} else {
			res.send( 'Error creating booster pack!', 501 );
		}
	}
	
	// route the user to the sealed screen, and pass it the six packs of cards
    res.render( 'layout.jade', {
		templateName : JSON.stringify('Limited')
        , options : JSON.stringify( {
            format : 'Sealed'
			, boosters : boosters
            , auth : Auth.getAuthority( req )
        } )
    } );
	
} );


app.get( '/builder', function(req, res) {
    
    var deckContainer;
    var deckData;
    
    var options = {
        auth : Auth.getAuthority( req )
        , deckContainer : deckContainer
        , deckData : deckData
    };
    
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    mongoose.model( 'DeckData', DeckDataSchema, 'Decks' );
    
    // TODO check for deck being private and it's user not logged in
    if( req.query.deckId != undefined ) {
        
        var deckId = req.query.deckId;
        
        // get the deck container from the database
        database.model('DeckContainer').findById( deckId, function(err, container) {
            if( !err ) {
                // get the deck data ID from the deck container
                var deckDataId = container.deckDataId;
                
                // save the deck container
                options.deckContainer = container;
                
                database.model('DeckData').findById( deckDataId, function( err, data ) {
                    if( !err ) {
                        // save the deck data
                        options.deckData = data;
                        routeFrontendWithOptions( res, 'Builder', options );
                    } else {
                        // route to blank builder
                        options.deckContainer = undefined;
                        routeFrontendWithOptions( res, 'Builder', options );
                    }
                } );
                
            } else {
                routeFrontendWithOptions( res, 'Builder', options );
            }
        } );
        
    }
    else {
        routeFrontendWithOptions( res, 'Builder', options );
    }
    
} );


app.get( '/decklists', function(req, res) {
    
    // get the profile object
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    mongoose.model( 'DeckData', DeckDataSchema, 'Decks' );
    
    // TODO add error cases (with database), respond to client with failure in these cases
    database.model( 'Profile' ).findOne( { user : req.query.user }, function(err, profile) {
        
        // get the deck data object from the database
        database.model( 'DeckContainer' ).find( { uTitle : req.query.deck }, function(err, container) {
            
            // get the deck container object and the deck data ID it references
            var deckContainer = container[0];
            var deckDataId = container[0].deckDataId;
            
            // query the database for the deck container data
            database.model( 'DeckData' ).findById( deckDataId, function(err, deckData) {
                
                // route the client to the profile page of the given user
                res.render( 'layout.jade', {
                    templateName : JSON.stringify('Foyer')
                    , options : JSON.stringify( {
                        subview : 'ProfileDeck'
                        , auth : Auth.getAuthority( req )
                        , profile : profile
                        , deckContainer : deckContainer
                        , deckData : deckData
                    } )
                } );
                
            } );
            
        } );
        
    } );
    
} );



app.post( '/newdeck', function(req, res) {
    
    // TODO if client is a guest, return error
    if( req.user.username == undefined ) {
        res.send( { status : "Error" } );
        return;
    }
    
    var user = req.user.username;
    
    // get the new deck name and deck data from the request
    var deckContainer = req.body.deckContainer;
    var deckData = req.body.deckData;
    
    console.log(deckContainer)
    console.log(deckData)
    
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    var ProfileModel = database.model('Profile');
    
    var deckDataModel = DeckDataModel.init();
    var deckData = new deckDataModel( deckData );
    
    // save the deck data to the database
    deckData.save( function(err) {
        if( err ) {
            // TODO handle this case
            console.log("Failed saving deck data.");
            res.send( { status : "Error" } );
        } else {
            
            var deckContainerModel = DeckContainerModel.init();
            deckContainer = new deckContainerModel( deckContainer );
            
            // get the deck data ID (as it is now in the database) and update the container with the deck ID.
            deckContainer.deckDataId = deckData._id;
            deckContainer.user = user;
            deckContainer.deckUrl = '/decklists?user=' + user + '&deck=' + deckContainer.uTitle;
            
            // save the deck container to the database
            deckContainer.save( function(err) {
                if( err ) {
                    // TODO handle error
                    console.log("Failed saving deck container.")
                    res.send( { status : "Error" } );
                } else {
                    
                    // get the user's profile
                    ProfileModel.findOne( { user : user }, function( err, profile ){
                        if( !err ) {
                            // get the deck container ID, and update the profile with the deck container ID (in the decks array)
                            var decks = profile.decks;
                            decks.push( deckContainer._id );
                            
                            mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
                            var profileModel = database.model('Profile');
    
                            profileModel.update(
                                { user : user }
                                , { decks : decks }
                                , { multi : true }
                                , function( error ) {
                                    // TODO handle this case
                                    console.log(error);
                                    res.send( { status : "Error" } );
                                }
                            );
                            
                            console.log("Success saving the new deck!")
                            res.send( { status : "Success" } );
                            
                        } else {
                            // TODO handle this case
                            console.log("Unable to find the user")
                            res.send( { status : "Error" } );
                        }
                    } );
                    
                }
            } );
            
        }
    } );
    
} );


app.post( '/profileSettingData', function(req, res) {
    
    // get the username
    var user = req.user.username;
    // TODO prevent guest
    if( user == undefined /* || user == 'Guest' */ ) {
        res.send( { status : "Error" } );
        return;
    }
    
    // query the database for the user's profile object
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    database.model('Profile').findOne( { user : user }, function( err, profile ){
        if( !err ) {
            var profileSettings = {
                fullName : profile.fullName
                , location : profile.location
                , description : profile.description
                , thumb : profile.thumb
                , thumbCardName : profile.thumbCardName
            }
            // respond to the client with the profile settings
            res.send( { status : "Success", settings : JSON.stringify(profileSettings) } );
        } else {
            res.send( { status : "Error" } );
        }
    } );
    
} );


app.post( '/editprofile', function(req, res) {
    
    // if client is a guest, return error //TODO make sure this or logic works
    var username = req.user.username;
    // TODO prevent guest
    if( username == undefined /* || username == 'Guest' */ ) {
        res.send( { status : "Error" } );
        return;
    }
    
    // get the new profile settings from the post request
    var body = req.body;
    var thumb = body.thumb;
    var thumbCardName = body.thumbCardName;
    var fullName = body.fullName;
    var description = body.description;
    var location = body.location;
    
    // TODO check the new settings for validity
    // TODO check the new settings for security
    
    // setup the update object, which will be passed to mongoose's update
    var updateData = {};
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
    database.model('Profile').update(
        //{ user : req.session.username } // TODO make sure this works!!
        { user : username }
        , updateData
        , { multi : true }
        , function( error ) {
            // TODO add error message to the response
            res.send( { status : 'Error' } );
        }
    )
    
    // return success status and username
    res.send( { status : "Success", username : username } );
    
} );


app.post( '/savedeck', function(req, res) {
    
    // if client is a guest, return error
    if( req.user == undefined || req.user.username == 'Guest' ) {
        res.send( { status : 'Error' } );
        return;
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


app.get( '/:username', function( req, res ){
    
    var username = req.params.username;
    
    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    
    var numDeckContainers = 0;
    var numProcessedContainers = 0;
    
    database.model('Profile').findOne( { user : username }, function(err, profile) {
        
        if( profile != null ) {
            
            numDeckContainers = profile.decks.length;
            
            profile.decks.forEach( function( deckContainerId, index ) {
                
                database.model('DeckContainer').findById( deckContainerId, function(err, deckContainer){
        
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
                                , 'auth' : Auth.getAuthority( req )
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
                    , 'auth' : Auth.getAuthority( req )
                    , 'user' : username
                    , 'profile' : {}
                } )
            } );
        }
        
    } );
    
} );


app.post( '/register', Auth.register );

app.post( '/login', passport.authenticate('local'), Auth.login );

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
} );