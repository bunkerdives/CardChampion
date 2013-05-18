var ChatController = {
    
    getChatMessage : function() {
        return $("#chat-msg").val();
    }
    
    , sendChatMsg : function() {
        var message = ChatController.getChatMessage();
        if( message.length > 0 ) {
            SocketController.socket.emit( 'newmsg', JSON.stringify( { msg : message } ) );
        }
        ChatController.clearChatInput();
    }
    
    , bindEnterKeyForChat : function() {
        
        var socket = SocketController.socket;
        
        jQuery(document).ready( function ($) {
            $('input').live("keypress", function(e) {
                if( e.keyCode == 13 ){
                    ChatController.sendChatMsg( socket ); 
                }
            } );
        } );
        
    }
    
    , clearChatInput : function() {
        $("#chat-msg").val('');
    }
    
};