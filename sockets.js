// get the draft and queue controllers
var Draft = require( './controllers/Draft.js' );
var Chat = require( './controllers/Chat.js' );

io = module.parent.exports.io;
passportSocketIo = module.parent.exports.passportSocketIo;
sessionStore = module.parent.exports.sessionStore;
sessionOptions = module.parent.exports.sessionOptions;

io.set( "authorization", passportSocketIo.authorize({
    
    key:    'express.sid',       //the cookie where express (or connect) stores its session id.
    secret: 'SaulGoodman', //the session secret to parse the cookie
    store:   sessionStore,     //the session store that express uses
    
}) );


io.sockets.on( 'connection', function(socket) {
    
    var username = socket.handshake.user.username;
    console.log("user connected: " + username);
    
    //socket.join('chat');
    
    ( function(socket, username){
        socket.on( 'joinChat', function(data) {
            Chat.joinChat( data, username );
        } );
    } ) (socket, username);
    

    
    ( function(socket, username){
        socket.on( 'newmsg', function(data) {
            Chat.newMsg( data, username );
        } );
    } ) (socket, username);
    
} );