var RegisterController = {
    
    sendRegisterRequest : function() {
        
        $.post(
            '/register'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                if( data != 'Error' ) {
                    LightboxController.closeLightbox();
                    $("#header-link-5").attr( "href", "/" + data );
                    $("#header-link-5").css( 'display', 'block' );
                    ViewModel.socketioHandshake();
                } else { // TODO display an error message here
                    console.log("Error logging in: " + data);
                }
            }
        );
        
    }
    
};