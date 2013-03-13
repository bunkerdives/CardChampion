Chat = {
    
    users : []
    
    , joinChat : function( data ) {
        
        var username = data.username;
        
        //Chat.users.push( socket );
        
        
    }
    
    , addUser : function(data) {
        var json = JSON.parse(data);
        var nick = json['nick'];
        Chat.users.push(nick);
        var data = {
            'users' : Chat.users
        };
        io.sockets.emit('newuser', JSON.stringify(data) );
    }
    
    , newMsg : function(data) {
        var json = JSON.parse(data);
        var nick = json['nick'];
        var msg = json['msg'];
        var data = JSON.stringify( {'nick' : nick, 'msg' : msg} );
        io.sockets.emit('newmsg', data);
    }
    
};

module.exports = Chat;