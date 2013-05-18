var Chat = require('../controllers/Chat.js');

var ChatRouter = {
	
	init : function(app) {
	
		app.get( '/recentchat', function(req, res) {
		    var recentChat = Chat.lastTenMessages();
		    res.send( { status : 'Success', data : lastTenMessages } );
		} );
	
	}
	
}

module.exports = ChatRouter;