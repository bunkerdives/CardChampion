var LoginController = {
    
    displayLoginLightbox : function() {
        
        // create the login table html
        var loginTable = $('<table><tr><td><h6>Enter Nickname:</h6></td><td><input type="text" id="login-nickname"/></td></tr><tr><td><h6>Enter Password:</h6></td><td><input type="text" id="login-password"/></td></tr><tr><td><button id="register-btn" class="btn btn-small btn-success">Register</button></td><td><button id="login-btn" class="btn btn-small btn-success">Login</button></td></tr></table>');
    
        // display the login table UI in the lightbox 
        LightboxController.showLightbox( loginTable );
        
        // assign an event handler for the login button's click event
        $("#register-btn").click( RegisterController.sendRegisterRequest );
        $("#login-btn").click( LoginController.sendLoginRequest );
    
    }
    
    , sendLoginRequest : function() {
        
        $.post(
            '/login'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                if( data == 'OK' ) {
                    localStorage.setItem('auth', true);
                    LightboxController.closeLightbox();
                } else { // TODO display an error message here
                    console.log("Error logging in: " + data);
                }
            }
        );
        
    }
    
};