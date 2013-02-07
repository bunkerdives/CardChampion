Foyer = {
    
    nickname : ''
    
    , socket : null
    
    , init : function() {
        Foyer.registerHandlers();
    }
    
    , registerHandlers : function() {
        console.log("Registered foyer handlers!");
        var data = { 'set' : 'LEA' };
        $("#draft-button").click( data, Foyer.draftSet );
        $("#select-sealed-button").click( data, Sealed.startSealed );
		$("#nick-submit-btn").click( Foyer.hideLightbox );
        
        $(".set-tr").each( function () {
            var tr = this;
            tr.click( Foyer.selectSet );
        } );
    }
    
    , draftSet : function(event) {
        
        var set = event.data.set;
    
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
	
	, hideLightbox : function() {
        
        console.log("Hide lightbox");
        
        Foyer.nickname = $('#nick-input').val();
		
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
        
        var json = JSON.parse(data);s
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