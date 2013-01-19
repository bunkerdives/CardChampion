Foyer = {
    
    init : function() {
        console.log("Foyer init")
    }
	
    , showFoyerInterface : function() {
    
        // hide the login
        $("#login").css( "display", "none" );
    
        // toggle visibility of the lobby interface
        $("#foyer").css( "display", "block" );
        Foyer.bindButtons();
        
    }
    
    , draftSet : function(set) {
    
        // connect a socket to the server
        var socket = io.connect('http://localhost');
        
        if( set != "GTC" ){
            return;
        }
        
		var data = { 'nick' : 'Dean', 'set' : set };
        
        // register a socket listener for the draft start event and its data
        socket.on( 'DraftStart', function( data ) {
            Draft.draftStart( data, socket );
        } );
		
		// show the user a dialog with the number of current drafters in the queue
		socket.on( 'NewDrafter', function(data) {
            Foyer.showDraftDialog( data );
		});
        
        socket.on( 'Unsubscribe', function(data) {
            console.log("Unsubscribed")
            socket.leave( '/' + set );
        });
        
        // send a socket msg to server that the client wants to join a queue
        socket.emit( 'JoinDraftQueue', JSON.stringify(data) );
        
    }
	
	, showDraftDialog : function( data ) {
		
		console.log('showdraftdialog');
		
 		// toggle visibility of the queue list
		$('#queue_list').css( "display", "block" );
		
		// display the queue dialog and show the number of players
		var players = data + " players";
		$('#queue_size').html( players );
		
	  }
	
};

$( function() {
    Foyer.init();
} );