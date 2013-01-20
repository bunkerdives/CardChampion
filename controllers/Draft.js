//var io = module.parent.exports.io;
var BoosterPack = require('./BoosterPack.js');
var uuid = require('node-uuid');

Draft = {

    // an object with each ongoing draft's data
    drafts : { }
    
    // an object containing the queues of each tournament type
    , draft_queues : {
        'GTC' : {
            'id' : uuid.v4() // automatically name the first available queue
            , 'set' : 'GTC'
            , 'players' : []
            , 'player_data' : {}
            , 'size' : 8
            , 'pack' : 0
            , 'dir' : 0 // 0 = left, 1 = right
        }
    }
    
    , joinDraftQueue : function( data, socket ) {
    
		// get the client's nick, format, set, and size of tourney from the request
        var json = JSON.parse(data);
        var nick = json['nick'] + "_" + uuid.v4();
        var set = json['set'];
        
		// add this socket to the proper queue room
        var queue = Draft.draft_queues['GTC']
        var id = queue.id;
		socket.join( id );
        
        console.log( "joinDraftQueue started a new queue, named: " + id );
        
        // add the user to our list of players
        queue.players.push( nick );
        
        // create an object to house a player object for use during the draft
        var player_obj = { 
            'nick' : nick
            , 'socket' : socket
            , "picks" : []
            , "packHeld" : []
            , "left" : ''
            , "right" : ''
        };
        
        // add the player data to this tourney's current hash of queued players
        Draft.draft_queues[ set ].player_data[nick] = player_obj;
        
        // if the queue has enough players, start the tourney and notify users
        var size = queue.players.length;
        if( size == 8 ){
            
            // move this draft's queue object into the drafts object for future use
            Draft.drafts[id] = Draft.draft_queues[set];
            
            // create a new draft queue for future drafters to join
			Draft.draft_queues[ set ] = Draft.newEmptyQueueObj( set, 8 );
            
            // create a new draft tournament
            Draft.newDraft( id );
			
			return;
            
        }
		
		// send a socket event to all drafters showing the number of players
        // TODO send the name of the new player to enter the draft
		io.sockets.in( id ).emit( 'NewDrafter', size );
		
    }

    , newDraft : function( draftId ) {
        
        console.log("\n\nNEW DRAFT\n\n");
        
        // get the nicks of the first and last players in the pod
        var players = Draft.drafts[draftId].players
        var first = players[0];
        var last = players[7];
        
        console.log( "First user: " + first )
        console.log( "Last user: " + last )
        
        console.log( "\n\nNew draft's engine object: ")
        console.log( Draft.drafts[draftId] )
        
        // loop through each player in the group's data
        for( var i = 0; i < players.length; ++i ){
            
            // assign the players to the left of this user
            if( i == 0 )
                pData['left'] = last;
            else
                pData['left'] = players[i-1];
            
            // assign the players to the right of this user
            if( i > 7 )
                pData['right'] = first;
            else
                pData['right'] = groupData[i+1].nick;
            
            i += 1;
            
        }
        
        console.log("\n\nUpdated draft engine object with left and right attributes:")
        console.log(Draft.drafts[draftId])
        
        // signal start of draft to each player with the draft order, first to last
        Draft.startDraft( draftId );
        
        // assign and give the clients their first booster pack
        Draft.distributeBoosterPacks( draftId );
        
        // register a handler to listen for new user picks over the socket
        io.sockets.in( draftId ).on( 'CardPick', function( data ) {
            Draft.newPick( data, draftId );
        } );
        
    }
    
    , startDraft : function( draftId ) {
        
        var players = Draft.drafts[draftId].players;
        var order = JSON.stringify( players );
       
        // send a start draft event to all the players in this draft
        io.sockets.in( draftId ).emit( 'DraftStart', { 'order' : order } );
        
    }
    
    , distributeBoosterPacks : function( draftId ) {
        
        console.log("distributeBoosterPacks");
        
        var players = Draft.drafts[draftId].players;
        var size = Draft.drafts[draftId].size;
    
        // give each player in the draft a new, unopened booster pack
        for( var i = 0; i < size; ++i ){
        
            nick = players[i];
            socket = pData[nick].socket;
        
            // create a randomized booster pack for the given set
            //booster = BoosterPack.newBooster(set);
            
            // send a NewBooster event to the player w/ the booster pack inside
            socket.emit( 'NewBooster', { 'booster' : "empty booster!" } );
            
        }
        
    }
    
    , newPick : function( data ) {
    
        var data = $.parseJSON( data );
        var draftId = data['dId'];
        var pick = data['pick'];
        var nick = data['nick'];
        
        // get the player's data object and position
        var draft = Draft.drafts[ draftId ];
        var pData = draft.players.nick;
        
        // save the player's pick
        pData.picks.push( pick );
        
        // remove the card from the user's booster pack
        delete pData.curpack.pick;
        
        // update this draft's total number of picks
        draft.picks += 1;
        
        // push the remaining cards into the booster queue of the player to the right/left
        var next = pData[ pData['direction'] ];
        if( draft.players[next].boosterQueue.length == 0 )
            draft.players[next].curPack = pData.curpack;
        else
            draft.players[next].boosterQueue.push( pData.curpack );
            
        // if the player's booster queue is nonempty, assign the first as their current pack
        if( pData.boosterQueue.length == 0 )
            pData.curpack = null;
        else
            pData.curpack = pData.boosterQueue.shift();
        
        // send a PackPass event with the remaining cards to the player on the left/right
        if( pData.curpack.length > 0 ){
            draft.players[next].socket.emit( 'PackPass', { 'booster' : pData.curpack } );
            return;
        }
        
        // if the last pick was received, tell each client that the draft is over
        if( draft.picks == 45*8 ){
            // TODO send an EndDraft message to all players in the draft
        }
        // if at end of the first or second packs, change direction and give out unopened boosters
        else if( draft.picks == 15*8 ){
            draft.direction = 'right';
            Draft.distributeBoosterPacks( draftId );
        }
        else if( draft.picks == 30*8 ){
            draft.direction = 'left';
            Draft.distributeBoosterPacks();
        }
        
    }
    
    , endDraft : function( draftId ) {
        
        var draftData = drafts[ draftId ];
        var players = draftData.players;
        var order = JSON.stringify( players );
        
        // send a start draft event to all the players in this draft
        io.sockets.in( draftData.draftId ).emit( 'EndDraft', { 'order' : order } );
        
    }
    
    , newEmptyQueueObj : function( set, size ) {
        
        var queue = {
            'id' : uuid.v4() // automatically name the first available queue
            , 'set' : set
            , 'players' : []
            , 'player_data' : {}
            , 'size' : size
            , 'pack' : 0
            , 'dir' : 0 // 0 = left, 1 = right
        }
        
        return queue;
        
    }
    
};

module.exports = Draft;