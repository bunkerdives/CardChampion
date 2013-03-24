var RegisterController = {
    
    sendRegisterRequest : function() {
        
        var username = $("#register-nickname").val();
        var pass1 = $("#register-password").val();
        var pass2 = $("#register-password-confirm").val();
        var email1 = $("#register-email").val();
        var email2 = $("#register-email-confirm").val();
        
        var alphanumera = new RegExp('[0-9a-zA-Z]');
        var spaceRegex = /\s/g;
        
        
        if( !username.match(alphanumera) || spaceRegex.test(username) || username.length > 13 ){
            console.log("Bad username!")
            return null;
        }
        
        if( pass1 != pass2 ) {
            console.log("Passwords don't match!")
            return null;
        }
        
        if( ! pass1.match(alphanumera) || !pass1.match(alphanumera) || spaceRegex.test(pass1) || pass1.length > 16  ){
            console.log("Bad pass1!")
            return null;
        }
        
        if( ! pass2.match(alphanumera) || !pass2.match(alphanumera) || spaceRegex.test(pass2) || pass2.length > 16  ){
            console.log("Bad pass2")
            return null;
        }
        
        if( email1 != email2 ) {
            console.log("Emails don't match!")
            return null;
        }
        
        if( ! email1.match(alphanumera) || !email1.match(alphanumera) || spaceRegex.test(email1) || email1.length > 32  ){
            console.log("Bad email1")
            return null;
        }
        
        if( ! email2.match(alphanumera) || !email2.match(alphanumera) || spaceRegex.test(email2) || email2.length > 32  ){
            console.log("Bad email2")
            return null;
        }
        
        $.post(
            '/register'
            , { username : username, password : pass1, email : email1 }
            , function( data ) {
                console.log("RegisterController data = " + data)
                if( data != 'Error' ) {
                    LightboxController.closeAuthLightbox();
                    $("#header-link-5").attr( "href", "/" + data );
                    $("#header-link-5").css( 'display', 'block' );
                    ViewModel.socketController.socketioHandshake();
                } else { // TODO display an error message here
                    console.log("Error logging in: " + data);
                }
            }
        );
        
    }
    
};