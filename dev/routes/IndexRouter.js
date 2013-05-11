var mongoose = require('mongoose');
var database = module.parent.exports.database;
var DeckContainerSchema = require('../schemas/DeckContainerSchema.js');
var Auth = require( '../controllers/Auth.js' );


var IndexRouter = { 
	
	init : function(app) {
	
		// '/' - show the main view to the user (right now it's recent decks)
		app.get( '/', function(req, res) {
		
		    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
		    database.model( 'DeckContainer' ).find( {}, function(err, deckContainers) {
        
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
		
	}
	
}

module.exports = IndexRouter;