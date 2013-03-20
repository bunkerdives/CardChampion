var SocketController = function() {
  
    this.socketioHandshake = function() {
        
        console.log("socketioHandshake")
        var socket = io.connect('http://localhost');
      
        socket.on( "connect", function() {
            socket.emit( 'joinChat', JSON.stringify({ room : 'generalChat' }) );
        } );
      
        socket.on( "newmsg", function(data) {
            
            data = JSON.parse(data);
            var user = data.user;
            var msg = data.msg;
            console.log(user + ": " + msg);
            
        	var convo = $("#chat-convo-wrapper");
        	var convoInner = $("#chat-convo"); 
        	var atBottom = ( convoInner.outerHeight() - convo.scrollTop() ) <=  convo.height();
        	var msg = "<div class='chat-msg'><span class='chat-username' style='color:red;'>" + user + ":</span><span>" + msg + "</span></div>";
        	convoInner.append(msg);
        	if( atBottom ){
        		convo.stop().animate({ scrollTop: convo[0].scrollHeight }, 300);
        	}
            
        } );
      
        this.socket = socket;
        
    };
    
};