var server = require( './Server.js' );
var draft = require( './Draft.js' );
var uuid = require('node-uuid');

Queues = {

    // an object containing the queues of each tournament type
    draft_queues : {
        'GTC' : []
    }
    
    , joinDraftQueue : function( data, socket ) {
    
		console.log('Data:');
		console.log(data);
        // convert the datastring into an object
        var json = JSON.parse(data);
    
        // get the client's nick, format, set, and size of tourney from the request
        var nick = json['nick'];
        var set = json['set'];
		
		// add this socket to the proper queue room
		socket.join(set);
        
        console.log("Adding " + nick + " to the queue");
        
        // create a small object to hold the nick and socket
        var pData = { 'nick' : nick, 'socket' : socket };
        
        // add the player data to this tourney's current list of queued players
        var queued = Queues.draft_queues[ set ];
        queued.push( pData );
        
        // if the queue has enough players, start the tourney and notify users
        if( queued.length == 8 ){
        
            // create a new draft queue for future drafters to join
			Queues.draft_queues[ set ] = [];
            
            // create a tourney ID and make sure it's available
            var tourneyId = uuid.v4();
            
            //io.sockets.in(set).emit( 'Unsubscribe' );
        
            // create a new draft tournament
            draft.newDraft( tourneyId, set, queued );
			
			return;
            
        }
		
		// send a socket event to all drafters showing the number of players
		io.sockets.in(set).emit( 'NewDrafter', queued.length );
        //io.of('/Drafts').emit( 'NewDrafter', queued.length );
        
		console.log('end');
		
    }

};

module.exports = Queues;