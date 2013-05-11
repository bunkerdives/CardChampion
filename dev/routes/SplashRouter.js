var Auth = require( '../controllers/Auth.js' );


var SplashRouter = {
	
	init : function(app) {
	
		// '/splash' - show the user the splash view
		app.get( '/splash', function(req, res) {
		    res.render( 'layout.jade', {
		        templateName: JSON.stringify('Splash')
		        , options: JSON.stringify( {
		            auth : Auth.getAuthority( req )
		        } )
		    } );
		} );
	
	}
	
}

module.exports = SplashRouter;