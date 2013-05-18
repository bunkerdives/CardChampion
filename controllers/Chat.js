Chat = {
    
    // a queue to contain the most recent 10 chat messages
    lastTen : []
    
    , joinChat : function( data, socket ) {
        var room = data.room;
    }
    
    // newMsg - receive a user's message data and forward to all users over the network
    , newMsg : function( data, user ) {
        
        // create the message data to be sent to everyone
        var mData = JSON.stringify( {
            msg : data.msg
            , user : user
        } );
        
        // push the message data into the queue, and shift the queue if necessary
        if( this.lastTen.length >= 10 ) {
            this.lastTen.shift();
        }
        this.lastTen.push( mData );
        
        // send the message to each client
        io.sockets.emit( 'newmsg', mData );
        
    }
    
    // lastTenMessages() - returns the last ten messages in a stringified queue
    , lastTenMessages : function() {
        var ten = JSON.stringify( Chat.lastTen );
        return ten;
    }
    
};

module.exports = Chat;