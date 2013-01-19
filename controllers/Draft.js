//var io = module.parent.exports.io;
var BoosterPack = require('./BoosterPack.js');

Draft = {

    // an object with each ongoing draft's data
    drafts : {},

    newDraft : function( draftId, set, groupData ) {
        
        console.log("new draft");
    
        // create an object containing this draft's data
        var draftData = { 'id' : draftId, 'set' : set, 'players' : [], 'pData' : {},
                          'packNum' : 1, 'direction' : 'left', 'size' : 8 };
        
        // add this draft's data to our super draft hash
        Draft.drafts[ draftId ] = draftData;
        
        var draft = Draft.drafts[ draftId ];
        
        // get the nicks of the first and last players in the pod
        var first = groupData[0].nick;
        var last = groupData[7].nick;
		
		//console.log( 'groupData:' );
		//console.log( groupData );
        
        // loop through each player in the group's data
        for( var i = 0; i < groupData.length; ++i ){
			
			var o = groupData[i];
			//console.log( 'object' );
			//console.log( o );
        
            // add the player's nick to the draft's list of players
            draftData.players[i] = o.nick;
            
            // add the player's socket to this draft's socket group
            var socket = o.socket;
            socket.join( draftId );
        
            // create a player object for each player
            var pData = {};
            pData['socket'] = socket;
            pData['picks'] = [];
            pData['curPack'] = [];
            pData['boosterQueue'] = [];
            
            // add the object to this draft's data structure
            draftData.pData[ o.nick ] = pData;
            
            // assign the players to the left of this user
            if( i == 0 )
                pData['left'] = last;
            else
                pData['left'] = groupData[i-1].nick;
            
            // assign the players to the right of this user
            if( i > 7 )
                pData['right'] = first;
            else
                pData['right'] = groupData[i+1].nick;
            
            i += 1;
            
        }
        
        // signal start of draft to each player with the draft order, first to last
        Draft.startDraft( draftId );
        
        // assign and give the clients their first booster pack
        Draft.distributeBoosterPacks( draftData );
        
        // register a handler to listen for new user picks over the socket
        io.of( draftId ).on( 'CardPick', function( data ) {
            Draft.newPick( data, draftId );
        } );
        
    },
    
    startDraft : function( draftId ) {
        
        //var draftData = Draft.drafts[ draftId ];
		// **********************
        var draft = Draft;
        console.log(draftId);
        console.log(draft);
        var drafts = draft.drafts;
        var eventId = drafts[ draftId ];
        var players = eventId.players;
        var order = JSON.stringify( players );
        
        console.log("start draft");
        
        // send a start draft event to all the players in this draft
        io.sockets.in( Draft.drafts[ draftId ].draftId ).emit( 'StartDraft', { 'order' : order } );
        
    },
    
    distributeBoosterPacks : function( draftId ) {
        
        var draftData = drafts[ draftId ];
        var players = draftData['players'];
        var pData = draftData['pData'];
        var size = players.length;
        var socket, booster, nick;
    
        // give each player in the draft a new, unopened booster pack
        for( var i = 0; i < size; ++i ){
        
            nick = players[i];
            socket = pData[nick].socket;
        
            // create a randomized booster pack for the given set
            booster = BoosterPack.newBooster(set);
            
            // send a NewBooster event to the player w/ the booster pack inside
            socket.emit( 'NewBooster', { 'booster' : JSON.stringify(booster) } );
            
        }
        
    },
    
    newPick : function( data ) {
    
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
        
    },
    
    endDraft : function( draftId ) {
        
        var draftData = drafts[ draftId ];
        var players = draftData.players;
        var order = JSON.stringify( players );
        
        // send a start draft event to all the players in this draft
        io.sockets.in( draftData.draftId ).emit( 'EndDraft', { 'order' : order } );
        
    }
    
};

module.exports = Draft;