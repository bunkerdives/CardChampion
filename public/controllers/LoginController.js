var LoginController = {
    
    displayLoginLightbox : function() {
        
        // create the login table html
        var loginTable = $('<table><tr><td><h6>Enter Nickname:</h6></td><td><input type="text" id="login-nickname"/></td></tr><tr><td></td><td><button id="login-btn" class="btn btn-small btn-success">Login</button></td></tr></table>');
    
        // display the login table UI in the lightbox 
        LightboxController.showLightbox( loginTable );
        
        // assign an event handler for the login button's click event
        $("#login-btn").click( LoginController.sendLoginRequest );
    
    }
    
    , sendLoginRequest : function() {
        
        $.post(
            '/login'
            , { user : $("#login-nickname").val() }
            , function( data ) {
                if( data == 'OK' ) {
                    LightboxController.closeLightbox();
                } else { // TODO display an error message here
                    console.log("Error logging in!");
                }
            }
        );
        
    }
    
};