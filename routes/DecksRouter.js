var mongoose = require('mongoose');
var database = module.parent.exports.database;
var DeckContainerSchema = require('../schemas/DeckContainerSchema.js');
var DeckDataSchema = require('../schemas/DeckDataSchema.js');
var ProfileSchema = require('../schemas/ProfileSchema.js');
var Auth = require( '../controllers/Auth.js' );


var DecksRouter = {
	
	init : function(app) {
	
		// '/decks' - show the Foyer view to the user with recent decks visible
		app.get( '/decks', function(req, res) {
    
		    // TODO filter private decks; select format
		    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
		    database.model( 'DeckContainer' ).find( {}, function(err, deckContainers) {
        
		        if( !err ){
				
		            var decks = [];
		            deckContainers.forEach( function( deckContainer, index ) {
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
	
	
		// '/decklists' - show a user's deck, in the profile view
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
	
	}
	
}

module.exports = DecksRouter;