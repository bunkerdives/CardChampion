var MultiverseToCardMap = require('../utils/MultiverseToCardMap.js');
var SetController = require('../utils/SetController.js');
var Auth = require( '../controllers/Auth.js' );


var CardRouter = {
	
	init : function(app) {
	
		// '/card' - route the user to a particular card view, specified by card multiverse
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

		// '/cardData' - simply return card data, specified by card multiverse
		app.get( '/cardData', function(req,res) {
	
			var multiverse = req.query.multiverse;
	
			// get the card meta data TODO test if the multiverse is not valid
			var cardMetaData = MultiverseToCardMap[ multiverse ];
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
	
	}
	
}

module.exports = CardRouter;