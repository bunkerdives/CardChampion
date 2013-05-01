var LoginController = {
    
    sendLoginRequest : function() {
        
		LoadingWheelController.start('darker');
				
        var loginRequest = $.post(
            '/login'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                console.log("loginRequest: data = " + data)
                if( data != 'Error' ) {
                    LightboxController.closeAuthLightbox();
					LoadingWheelController.stop();
                    SocketController.socketioHandshake();
                }
            }
        );
        
		loginRequest.error( function( jqxhr, status, error ) {
            // TODO display to the user that the login failed
			LightboxController.showAuthError(error);
			LoadingWheelController.stop();
		} );
        
    }
    
    , sendGuestRequest : function() {
			
	    LoadingWheelController.start('darker');
        
        var guestRequest = $.post(
            '/login'
            , { username : 'Guest', password : 'Guest' }
            , function(data) {
                console.log("guestRequest: data = " + data)
                if( data != 'Error' ) {
                    LightboxController.closeAuthLightbox();
					LoadingWheelController.stop();
                    SocketController.socketioHandshake();
                }
            }
        );
        
		guestRequest.error( function( jqxhr, status, error ) {
            // TODO display to the user that the guest login failed
			LightboxController.showAuthError(error);
			LoadingWheelController.stop();
		} );
        
    }
    
};