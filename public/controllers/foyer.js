Foyer = {
    
    init : function() {
        console.log("Foyer initialized");
        //Foyer.registerHandlers();
    }
    
    , registerHandlers : function() {
        
        $("#draft-button").click( Foyer.draftSet('GTC') );
        $("#sealed-button").click( Sealed.startSealed('GTC') );
				$("#chat-button").click( Foyer.showLightbox() );
				$("#hide-lightbox-button").click( Foyer.hideLightbox() );
    }
    
    , draftSet : function(set) {
    
        // connect a socket to the server
        var socket = io.connect('http://localhost');
        
        if( set != "GTC" ){
            return;
        }
        
		// setup the socket callbacks to handle state messages from the server
        Foyer.setupSocketCallbacks( socket );
        
        // send a socket msg to server that the client wants to join a queue
        var data = { 'nick' : 'Dean', 'set' : set };
        socket.emit( 'JoinDraftQueue', JSON.stringify(data) );
        
    }
    
    , setupSocketCallbacks : function( socket ) {
        
        // register a socket listener for the draft start event and its data
        socket.on( 'StartDraft', function( data ) {
            Draft.startDraft( data, socket );
        } );
		
		// show the user a dialog with the number of current drafters in the queue
		socket.on( 'NewDrafter', function(data) {
            Foyer.showDraftDialog( data );
		});
        
    }
	
	, showDraftDialog : function( data ) {
		
 		// toggle visibility of the queue list
		$('#queue_list').css( "display", "block" );
		
		// display the queue dialog and show the number of players
		var players = data + " players";
		$('#queue_size').html( players );
		
	}
	
	, showLightbox : function() {
		
		// hide "Chat" button
		$('#chat-hidden').css("display", "none");
		
		// show nickname lightbox
		$('#nickname-lightbox').css("display", "block");
		
	}
	
	, hideLightbox : function() {
		
		//Show "chat" button
		$('#chat-hidden').css("display", "block");
		
		//hide nickname lightbox
		$('#nickname-lightbox').css("display", "none");
		
	}
	
	, showChat : function() {
		
		//Show "chat" button
		$('#chat-shown').css("display", "block");
		
		//hide nickname lightbox
		$('#nickname-lightbox').css("display", "none");
		
		//hide carousel
		$('#screenshot-carousel').css("display", "none");
		
	}
	
};

$( function() {
    Foyer.init();
} );