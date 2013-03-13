var RegisterController = {
    
    sendRegisterRequest : function() {
        
        $.post(
            '/register'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                if( data == 'OK' ) {
                    console.log("RegisterController OK" )
                    localStorage.setItem('auth', true);
                    LightboxController.closeLightbox();
                } else { // TODO display an error message here
                    console.log("Error logging in: " + data);
                }
            }
        );
        
    }
    
};