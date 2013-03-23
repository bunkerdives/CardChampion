var LoginController = {
    
    sendLoginRequest : function() {
        
        $.post(
            '/login'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                console.log("LoginController data = " + data );
                if( data != 'Error' ) {
                    LightboxController.closeAuthLightbox();
                    $("#header-link-5").css( 'display', 'block' );
                    $("#header-link-5").attr( "href", "/" + data );
                    ViewModel.socketController.socketioHandshake();
                } else { // TODO display an error message here
                    console.log("Error logging in: " + data);
                }
            }
        );
        
    }
    
    , sendGuestRequest : function() {
        
        $.post(
            '/guest'
            , { username : 'Guest', password : 'Guest' }
            , function(data) {
                if( data != 'Error' ) {
                    LightboxController.closeAuthLightbox();
                    $("#header-link-5").css( 'display', 'none');
                    ViewModel.socketController.socketioHandshake();
                } else { // TODO display an error message
                    console.log("Error logging in as a guest!");
                }
            }
        );
        
    }
    
};