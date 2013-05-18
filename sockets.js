// get the chat controller
var Chat = require( './controllers/Chat.js' );

io = module.parent.exports.io;
passportSocketIo = module.parent.exports.passportSocketIo;
sessionStore = module.parent.exports.sessionStore;
sessionOptions = module.parent.exports.sessionOptions;


io.set( 'authorization', passportSocketIo.authorize(sessionOptions) );

io.sockets.on( 'connection', function(socket) {
    
    var user = socket.handshake.user.username;
    
    socket.on( 'joinChat', function(data) {
        Chat.joinChat( JSON.parse(data, socket) );
    } );
	
    socket.on( 'newmsg', function(data) {
        Chat.newMsg( JSON.parse(data), user );
    } );
	
	/*
    ( function(socket, user) {
        socket.on( 'joinChat', function(data) {
            Chat.joinChat( JSON.parse(data, socket) );
        } );
    } )(socket, user);

    ( function(socket, user) {
        socket.on( 'newmsg', function(data) {
            Chat.newMsg( JSON.parse(data), user );
        } );
    } )(socket, user)
	*/
	
    
} );