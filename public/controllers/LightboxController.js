var LightboxController = {
	
		positionAuthLightbox : function() {
			//console.log('positionAuthLightbox function called.')
			var lightboxW = 230;
			var lightboxLeft = ($(window).width()/2)-(lightboxW/2);
			$('#authlightbox-container').css('left', lightboxLeft);
	  }
		
		, showRegisterForm : function() {
			$('#lightbox-txt-container span').text('Register');
			$('#login-username-container').css('display', 'none');
			$('#register-username-container').css('display', 'block');
			$('#login-password-container').css('display', 'none');
			$('#register-password-container').css('display', 'block');
			$('#register-password-confirm-container').css('display', 'block');
			$('#register-email-container').css('display','block');
			$('#register-email-confirm-container').css('display','block');
			$('#login-view-register-btn').css('display', 'none');
			$('#register-view-register-btn').css('display', 'block');
			$('#login-view-login-btn').css('display', 'none');
			$('#register-view-login-btn').css('display', 'block');
		}

		, showLoginForm : function() {
			$('#lightbox-txt-container span').text('Log In');
			$('#login-username-container').css('display', 'block');
			$('#register-username-container').css('display', 'none');
			$('#login-password-container').css('display', 'block');
			$('#register-password-container').css('display', 'none');
			$('#register-password-confirm-container').css('display', 'none');
			$('#register-email-container').css('display','none');
			$('#register-email-confirm-container').css('display','none');
			$('#login-view-register-btn').css('display', 'block');
			$('#register-view-register-btn').css('display', 'none');
			$('#login-view-login-btn').css('display', 'block');
			$('#register-view-login-btn').css('display', 'none');
		}
    
    // display the lightbox
    , showAuthLightbox : function( content ) {
    	
    	// display the lightbox
			$('#lightbox-shadow').show();
    	$('#authlightbox-container').show();
        
      jQuery(document).ready(function ($) {
      	$("#authlightbox").css('display','block');
				LightboxController.positionAuthLightbox();
				$(window).resize(function(){
					LightboxController.positionAuthLightbox();
				});
      });
				
				
    }

    // close the lightbox
    , closeAuthLightbox : function() {
				
        jQuery(document).ready(function ($) {
            $("#authlightbox").css('display','none');
        } );
				
    }
    
};