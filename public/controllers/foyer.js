Foyer = {
    
    nickname : ''
    
    , socket : null
    
    , init : function() {
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
        
        // install a callback to fire when the user presses the submit button
        $('#nick-submit-btn').click( Foyer.chooseNick );
		
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
    
    , chooseNick : function(event) {
        
        // get the nickname from the text input element
        var nick = $('#nick-input').val();
        
        console.log( nick );
        Foyer.nickname = nick;
        
        // open a chat socket
        socket = Foyer.socket;
        socket = io.connect('http://localhost');
        console.log("nickname: " + Foyer.nickname);
        socket.on('connect', function() {
            var data = JSON.stringify( {'nick' : nick} );
            socket.emit('adduser', data);
        });
        
        socket.on('newuser', Foyer.newUser);
        
        // install chat socket callbacks
        socket.on('newmsg', Foyer.newMsg);
        
        // install send button callback
        //$("#chat-send-btn").click( Foyer.sendMsg );
        
        ( function(socket){
            $("#chat-send-btn").click( function(data) {
                Foyer.sendMsg(data, socket);
            } );
        })(socket);
        
    }
    
    , sendMsg : function( data, socket ) {
        
        // get the message text
        var msg = $("#chat-msg").val();
        var data = JSON.stringify( { 'nick' : Foyer.nickname, 'msg' : msg } );
        socket.emit('newmsg', data);
        
    }
    
    , newUser : function(data) {
        
        var users = JSON.parse(data)['users'];
        
        for( var i = 0; i < users.length; ++i ){
            var nick = users[i];
            var chat = '<div class="chat-user" style="color:red;"><span class="chat-username">' + nick + '</span><span class="chat-status">Lobby</span></div>'
            $("#userlist").append(chat);
        }
        
    }
    
    , newMsg : function( data ) {
        
        var json = JSON.parse(data);
        var nick = json['nick'];
        var msg = json['msg'];
        
        console.log("New message!");
        console.log(nick);
        console.log(msg + "\n\n");
    }
	
};

$( function() {
    Foyer.init();
} );