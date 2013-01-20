// get the draft and queue controllers
var Draft = require( './controllers/Draft.js' );

// get the io object
io = module.parent.exports.io;

io.on( 'connection', function(socket) {

    // JoinDraftQueue socket listener binding
    socket.on( 'JoinDraftQueue', function(data) {
        Draft.joinDraftQueue(data, socket);
    } );
    
} );