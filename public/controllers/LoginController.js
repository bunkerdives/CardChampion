var LoginController = {
    
    sendLoginRequest : function() {
        
        var loginRequest = $.post(
            '/login'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                console.log("LoginController data = " + data );
                if( data != 'Error' ) {
                    LightboxController.closeAuthLightbox();
                    $("#header-link-5").css( 'display', 'block' );
                    $("#header-link-5").attr( "href", "/" + data );
                    ViewModel.socketController.socketioHandshake();
                }
            }
        );
				loginRequest.error( function( jqxhr, status, error ) {
					LightboxController.showAuthError(error);
				} );
        
    }
    
    , sendGuestRequest : function() {
        
        var guestRequest = $.post(
            '/guest'
            , { username : 'Guest', password : 'Guest' }
            , function(data) {
                if( data != 'Error' ) {
                    LightboxController.closeAuthLightbox();
                    $("#header-link-5").css( 'display', 'none');
                    ViewModel.socketController.socketioHandshake();
                }
            }
        );
				guestRequest.error( function( jqxhr, status, error ) {
					LightboxController.showAuthError(error);
				} );
    }
    
};