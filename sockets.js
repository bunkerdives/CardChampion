// get the draft and queue controllers
var draft = require( './controllers/Draft.js' );
var queue = require( './controllers/Queues.js' );

// get the io object
io = module.parent.exports.io;

io.on( 'connection', function(socket) {

    // JoinQueue socket listener binding
    socket.on( 'JoinDraftQueue', function(data) {
        queue.joinDraftQueue(data, socket);
    } );
    
} );

io.sockets.on('connection', function(socket) {
   
    ;
    
});