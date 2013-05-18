var mongoose = require('mongoose');
var database = module.parent.exports.database;
var Auth = require( '../controllers/Auth.js' );
var DeckContainerSchema = require('../schemas/DeckContainerSchema.js');
var DeckDataSchema = require('../schemas/DeckDataSchema.js');

var routeFrontendWithOptions = function( res, template, options ) {
    res.render( 'layout.jade', {
        templateName : JSON.stringify( template )
        , options : JSON.stringify( options )
    } );
};

var BuilderRouter = {
	
	init : function(app) {
	
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
	
	}
	
};

module.exports = BuilderRouter;