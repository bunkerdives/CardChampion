var Auth = require( '../controllers/Auth.js' );
var passport = require('passport');

var AuthRouter = {
	
	init : function(app) {
		
		app.post( '/register', Auth.register );

		app.post( '/login', passport.authenticate('local'), Auth.login );

		app.get('/logout', function(req, res) {
		    req.logout();
		    res.redirect('/');
		} );
		
	}
	
}

module.exports = AuthRouter;