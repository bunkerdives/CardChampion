var LightboxController = {
    
    // display the lightbox
    showAuthLightbox : function( content ) {
    	positionLightbox();

    	// display the lightbox
		$('#lightbox-shadow').show();
    	$('#lightbox-container').show();
        
        // assign an event handler for the login button's click event
        $("#register-btn").click( RegisterController.sendRegisterRequest );
        $("#login-btn").click( LoginController.sendLoginRequest );
        $("#guest-btn").click( LoginController.sendGuestRequest );
        
        jQuery(document).ready(function ($) {
            $("#authlightbox").css('display','block');
        } );
    }

    // close the lightbox
    , closeAuthLightbox : function() {
        jQuery(document).ready(function ($) {
            $("#authlightbox").css('display','none');
        } );
    }
    
};