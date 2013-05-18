var Auth = require( '../controllers/Auth.js' );


var AboutRouter = {

	init : function(app) {
		
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
		
	}
	
};

module.exports = AboutRouter;