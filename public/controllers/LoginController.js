var LoginController = {
    
    sendLoginRequest : function() {
        
				LoadingWheelController.start('darker');
				
        var loginRequest = $.post(
            '/login'
            , { username : $("#login-nickname").val(), password : $("#login-password").val() }
            , function( data ) {
                console.log("LoginController data = " + data );
                if( data != 'Error' ) {
										LoadingWheelController.stop();
                    LightboxController.closeAuthLightbox();
                    $("#header-link-5").css( 'display', 'block' );
                    $("#header-link-5").attr( "href", "/" + data );
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
            '/guest'
            , { username : 'Guest', password : 'Guest' }
            , function(data) {
                if( data != 'Error' ) {
										LoadingWheelController.stop();
                    LightboxController.closeAuthLightbox();
                    $("#header-link-5").css( 'display', 'none');
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