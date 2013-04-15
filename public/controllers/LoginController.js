var LoginController = {
    
    sendBasicLogin : function( username, password ) {
        console.log("Sending basic login for user " + username + "!");
        var loginRequest = $.post(
            '/login'
            , { username : username, password : password }
            , function( data ) {
                if( data != 'Error' ) {
                    console.log("Successfully sent basic login!")
                    ViewModel.socketController.socketioHandshake();
                }
            }
        );
    }
    
    , sendLoginRequest : function() {
        
		LoadingWheelController.start('darker');
				
        var loginRequest = $.post(
            '/login'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                if( data != 'Error' ) {
					LoadingWheelController.stop();
                    LightboxController.closeAuthLightbox();
                    ViewModel.socketController.socketioHandshake();
                }
            }
        );
        
		loginRequest.error( function( jqxhr, status, error ) {
			LoadingWheelController.stop();
			LightboxController.showAuthError(error);
		} );
        
    }
    
    , sendGuestRequest : function() {
			
	    LoadingWheelController.start('darker');
        
        var guestRequest = $.post(
            '/login'
            , { username : 'Guest', password : 'Guest' }
            , function(data) {
                if( data != 'Error' ) {
					LoadingWheelController.stop();
                    LightboxController.closeAuthLightbox();
                    ViewModel.socketController.socketioHandshake();
                }
            }
        );
        
		guestRequest.error( function( jqxhr, status, error ) {
			LoadingWheelController.stop();
			LightboxController.showAuthError(error);
		} );
        
    }
    
};