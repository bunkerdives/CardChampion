var server = require( './Server.js' );
var draft = require( './Draft.js' );
var uuid = require('node-uuid');

Queues = {

    // an object containing the queues of each tournament type
    tourney_queues : {
        'draft' : {
            'RtR' : {
                '8' : []
            }
        }
    },
    
    joinQueue : function( data, socket ) {
    
		console.log('Data:');
		console.log(data);
        // convert the datastring into an object
        var json = JSON.parse(data);
    
        // get the client's nick, format, set, and size of tourney from the request
        var nick = json['nick'];
        var format = json['format'];
        var set = json['set'];
        var size = json['size'];
        
        // TODO verify nick, format, and tourney name are all legit
		
		// add this socket to the proper queue room
		socket.join(format + set + size);
        
        // create a small object to hold the nick and socket
        var pData = { 'nick' : nick, 'socket' : socket };
        
        // add the player data to this tourney's current list of queued players
        var queued = Queues.tourney_queues[ format ][ set ][ size ];
        queued.push( pData );
        
        // if the queue has enough players, start the tourney and notify users
        if( queued.length == size ){
        
            // create a new draft queue for future drafters to join
			Queues.tourney_queues[ format ][ set ][ size ] = [];
            
            // create a tourney ID and make sure it's available
            var tourneyId = uuid.v4();
        
            // create a new draft tournament
            if( format == "draft" ){
                draft.newDraft( tourneyId, set, size, queued );
            }
			
			return;
            
        }
		
		console.log('new drafter');
		
		// send a socket event to all drafters showing the number of players
		io.sockets.in(format + set + size).emit( 'NewDrafter', queued.length );
        io.of('/Tourneys').emit( 'NewDrafter', queued.length );
        
		console.log('end');
		
    }

};

module.exports = Queues;