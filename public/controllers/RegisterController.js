var RegisterController = {
    
    sendRegisterRequest : function() {
        
        $.post(
            '/register'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                if( data != 'Error' ) {
                    //localStorage.setItem('auth', true);
                    LightboxController.closeLightbox();
                    $("#header-link-5").attr( "href", "/" + data );
                    $("#header-link-5").css( 'display', 'block' );
                } else { // TODO display an error message here
                    console.log("Error logging in: " + data);
                }
            }
        );
        
    }
    
};