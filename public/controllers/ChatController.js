var ChatController = {
    
    getChatMessage : function() {
        var message = $("#chat-msg").val();
        return message;
    }
    
    , sendChatMsg : function() {
        
        var message = ChatController.getChatMessage();
        var socket = ViewModel.socketController.socket;
        
        if( message.length > 0 ) {
            socket.emit( 'newmsg', JSON.stringify( { msg : message } ) );
        }
        
        ChatController.clearChatInput();
    }
    
    , bindEnterKeyForChat : function() {
        
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