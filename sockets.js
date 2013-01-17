// get the draft and queue controllers
var draft = require( './controllers/Draft.js' );
var queue = require( './controllers/Queues.js' );

// get the io object
io = module.parent.exports.io;

io.of( '/Tourneys' )
.on( 'connection', function(socket) {
	
	console.log('on tourneys connection!');

    // JoinQueue socket listener binding
    socket.on( 'JoinQueue', function(data) {
		console.log( 'joinQueue' );
        queue.joinQueue(data, socket);
    } );
    
    
    
} );

io.sockets.on('connection', function(socket) {
   
    ;
    
});