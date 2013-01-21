//var io = module.parent.exports.io;
var Booster = require('./Booster.js');
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
            , 'sockets' : {}
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
        
        // add a nick attribute to the user's socket
        socket.nick = nick;
        socket.draftId = id;
        
        // add the user to our list of players AND to our hash of sockets
        queue.players.push( nick );
        queue.sockets[nick] = socket;
        
        // create an object to house a player object for use during the draft
        var player_obj = { 
            'nick' : nick
            , "picks" : []
            , "packHeld" : []
            , "packQueue" : []
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
        
        // get the nicks of the first and last players in the pod
        var draft = Draft.drafts[draftId];
        var players = draft.players;
        var pData =  draft.player_data;
        var sockets = draft.sockets;
        var first = players[0];
        var last = players[7];
        
        // loop through each player in the group's data
        for( var i = 0; i < players.length; ++i ){
            
            var nick = players[i];
            var pObj = pData[nick];
            
            // assign the players to the left and right of this user
            if( i == 0 )
                pObj['left'] = last;
            else
                pObj['left'] = players[i-1];
            if( i == 7 )
                pObj['right'] = first;
            else
                pObj['right'] = players[i+1];
                
            // assign a CardPick event handler to the player's socket
            var socket = sockets[nick];
            /*
            socket.on( 'CardPick', function(data) {
                Draft.cardPick( data, draftId, socket );
            });
            */
            
            ( function(socket){
                socket.on( 'CardPick', function(data) {
                  Draft.cardPick( data, draftId, socket );
                });
            })(socket);
            
        }
        
        // signal start of draft to each player with the draft order, first to last
        Draft.startDraft( draftId );
        
    }
    
    , startDraft : function( draftId ) {
        
        var draft = Draft.drafts[draftId];
        var players = draft.players;
        var size = Draft.drafts[draftId].size;
        var set = draft.set;
        
        console.log("Starting draft with " + size + "players")
       
        // send a start draft event to all the players in this draft with their first booster pack
        for( var i = 0; i < size; ++i ){
        
            var nick = Draft.drafts[draftId].players[i];
            var socket = draft.sockets[nick];
        
            // create a randomized booster pack for the given set
            var booster = Booster.newBooster(set);
            var data = JSON.stringify({ 'booster' : booster });
            
            // put the booster data in the user object
            Draft.drafts[draftId].player_data[nick].packHeld = booster;
            
            console.log("startDraft user " + nick + "'s held pack: " + Draft.drafts[draftId].player_data[nick].packHeld )
            
            // send a NewBooster event to the player w/ the booster pack inside
            socket.emit( 'StartDraft', data );
            
        }
        
    }
    
    , distributeBoosterPacks : function( draftId ) {
        
        var draft = Draft.drafts[draftId];
        var players = draft.players;
        var pData = draft.player_data;
        var size = draft.size;
        var set = draft.set;
    
        // give each player in the draft a new, unopened booster pack
        for( var i = 0; i < size; ++i ){
        
            nick = players[i];
            socket = draft.sockets[nick];
        
            // create a randomized booster pack for the given set
            booster = Booster.newBooster(set);
            
            // send a NewBooster event to the player w/ the booster pack inside
            var data = JSON.stringify( { 'booster' : booster } );
            socket.emit( 'NewBooster', data );
            
        }
        
    }
    
    , cardPick : function( data, draftId, socket ) {
    
        var data = JSON.parse( data );
        var pick = data['pick'];
        
        // TODO get the user's ID from the socket
        var nick = socket.nick;
        var draftId = socket.draftId;
        
        console.log("User " + nick + " picked the card: " + pick)
        
        // get the player's data object and position
        var draft = Draft.drafts[ draftId ];
        var pData = draft.player_data[nick];
        
        // save the player's pick
        pData.picks.push( pick );
        
        var packHeld = Draft.drafts[draftId].player_data[nick].packHeld;
        
        // remove the card from the user's booster pack
        for( var i = 0; i < pData.picks.length; ++i ){
            if( pData.packHeld[i] == pick ){
                pData.packHeld.splice( i, 1 );
            }
        }
        
        var packRemains = pData.packHeld;
        console.log( "Remaining pack: " + Draft.drafts[ draftId ].player_data[nick].packHeld )
        
        // push the remaining cards into the booster queue of the player to the right/left
        var dir = draft['dir'], next;
        if( dir == 0 ){ // pass to the left
            next = pData['left'];
        }
        else{ // pass to the right
            next = pData['right'];
        }
        
        // if there are packs in this user's queue, send a PackPass event now
        if( pData.packQueue.length > 0 ){
            
            console.log("There are packs in " + nick + "'s queue, so send him the first as a PackPass")
            
            // remove the first pack from this players pack queue and mark it held
            var pack = pData.packQueue.shift();
            pData.packHeld = pack;
            
            console.log("Their next pack is: " + pack)
            
            // send a PackPass event with the remainder of the pack
            var data = JSON.stringify( { "booster" : pack } );
            draft.sockets[ nick ].emit( "PackPass", data );
            
        }
        else{
            console.log("There are no packs in " + nick + "'s queue, so set his packHeld to null")
            pData.packHeld = null;
        }
        
        // either make the pack remains the next player's currently held OR add it to their pack queue
        if( draft.player_data[next].packHeld == null ){
            
            console.log("The next player, " + next + ", is not holding a pack, so pass him the remains")
            
            // assign the next player the remaining pack
            draft.player_data[next].packHeld = packRemains;
            
            console.log("Remaining pack: " + packRemains)
            
            // signal the next player with a PackPass event
            var data = JSON.stringify( { "booster" : packRemains } );
            draft.sockets[next].emit( "PackPass", data );
            
        }
        else{ // add the pack to the player's pack queue 
            console.log("The next player, " + next + ", is holding a pack, so put the remains in his queue")
            draft.player_data[next].packQueue.push( packRemains );
        }
            
        // if at end of the first or second packs, change direction and give out unopened boosters
        if( draft.picks == 15*8 ){
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
        io.sockets.in( draftData.draftId ).emit( 'EndDraft', JSON.stringify( { 'order' : order } ) );
        
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