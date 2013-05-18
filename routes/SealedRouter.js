var BoosterPack = require('../utils/BoosterPack.js');
var SetController = require('../utils/SetController.js');
var Auth = require( '../controllers/Auth.js' );
var $ = require('jQuery');


var SealedRouter = {
	
	init : function(app) {
	
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
	
		// TODO fix the express wildcard bug with this configuration
		app.get( '/sealed/:pack1/:pack2/:pack3/:pack4/:pack5/:pack6', function(req, res) {
		
			var boosters = [];
			for( var i = 0; i < 7; ++i ) {
				if( ! SetController.validSet( set ) ) {
					packNum = 'pack' + i;
					var packSet = req.params[packNum];
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
			
			boosters = JSON.stringify(boosters);
	
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
	
	}
	
};

module.exports = SealedRouter;