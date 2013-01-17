Foyer = {
    
    init : function() {
        Foyer.bindButtons();
    }
	
    , showFoyerInterface : function() {
    
        // hide the login
        $("#login").css( "display", "none" );
    
        // toggle visibility of the lobby interface
        $("#foyer").css( "display", "block" );
        Foyer.bindButtons();
        
    }
    
    // bind buttons to their click handlers
    // TODO show the draft screen
    , bindButtons : function() {
        
        $("#draft_btn").bind( "click", function() {
            Foyer.draftSet( "RtR", '8' );
        } );
				
        $("#deck_builder_btn").bind( "click", function() {
            DeckBuilder.showBuilderInterface();
        } );
        
    }
    
    , draftSet : function( set, size ) {
    
        // connect a socket to the server
        var socket = io.connect('http://localhost/Tourneys');
        
        if( set != "RtR" ){
            return;
        }
        if( size != '8' ){
            return;
        }
        
        // send a socket msg to server that the client wants to join a queue
		var data = { 'nick' : Login.nick, 'format' : 'draft', 'set' : set, 'size' : size };
        socket.emit( 'JoinQueue', JSON.stringify(data) );
        
        // register a socket listener for the draft start event and its data
        socket.on( 'DraftStart', function( data ) {
            Draft.draftStart( data, socket );
        } );
		
		// show the user a dialog with the number of current drafters in the queue
		socket.on( 'NewDrafter', function(data) {
            Foyer.showDraftDialog( data );
            //Draft.showDraftInterface( data );
		});
        
    }
	
	, showDraftDialog : function( data ) {
		
		console.log('showdraftdialog');
		
 		// untoggle visibility of the lobby interface
      	$("#foyer").css( "display", "none" );
		  
		// toggle visibility of the draft interface
		$('#draft').css( "display", "block" );
		
		// display the queue dialog and show the number of players
		var players = data + " players";
		$('#queue').html( players );
		
	  }
	
};

$( function() {
    Foyer.init();
} );