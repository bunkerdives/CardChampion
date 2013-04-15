Chat = {
    
    joinChat : function( data, username ) {
        
        var json = JSON.parse(data);
        var room = json.room;
        
    }
    
    , newMsg : function( data, user ) {
        
        var json = JSON.parse(data);
        var msg = json.msg;
        
        var data = JSON.stringify( { msg : msg, user : user } );
        io.sockets.emit( 'newmsg', data );
    }
    
};

module.exports = Chat;