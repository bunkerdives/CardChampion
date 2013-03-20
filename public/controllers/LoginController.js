var LoginController = {
    
    displayLoginLightbox : function() {
        
        // create the login table html
        var loginTable = $('<table><tr><td><h6>Enter Nickname:</h6></td><td><input type="text" id="login-nickname"/></td></tr><tr><td><h6>Enter Password:</h6></td><td><input type="text" id="login-password"/></td></tr><tr><td><button id="register-btn" class="btn btn-small btn-success">Register</button></td><td><button id="login-btn" class="btn btn-small btn-success">Login</button></td></tr><tr><td><button id="guest-btn" class="btn btn-small btn-success">Guest</button></td></tr></table>');
    
        // display the login table UI in the lightbox 
        LightboxController.showLightbox( loginTable );
        
        // assign an event handler for the login button's click event
        $("#register-btn").click( RegisterController.sendRegisterRequest );
        $("#login-btn").click( LoginController.sendLoginRequest );
        $("#guest-btn").click( LoginController.sendGuestRequest );
    
    }
    
    , sendLoginRequest : function() {
        
        $.post(
            '/login'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                if( data != 'Error' ) {
                    LightboxController.closeLightbox();
                    $("#header-link-5").css( 'display', 'block' );
                    $("#header-link-5").attr( "href", "/" + data );
                    ViewModel.socketioHandshake();
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
                    LightboxController.closeLightbox();
                    $("#header-link-5").css( 'display', 'none');
                    ViewModel.socketioHandshake();
                } else { // TODO display an error message
                    console.log("Error logging in as a guest!");
                }
            }
        );
        
    }
    
};