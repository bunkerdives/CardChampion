var LightboxController = {
	
	showRegisterForm : function() {
		
        LightboxController.closeErrorAlert();
		
        LightboxController.displayRegisterContainers();
        LightboxController.hideLoginContainers();
		
		$('#register-animate-wrapper').animate( { height: '111px', opacity: '1' }, 600 );
		
		$('#login-view-register-btn').animate(
            { opacity: '0' }
            , 250
            , function(){
				$(this).css('display','none');
				$('#register-view-register-btn').css( {
					'display' : 'block'
					, 'height' : '30px'
				} ).animate( { opacity: '1' }, 450 );
		    }
        );
	
		$('#login-view-login-btn').animate(
            { opacity: '0' }
            , 250
            , function(){
				$(this).css('display','none');
				$('#register-view-login-btn').css( {
					'display' : 'block'
					, 'height' : '30px'
				} ).animate( { opacity: '1' }, 450 );
		    }
        );
		
		$('#login-register-title').html('Signup')
		
	}

	, showLoginForm : function() {
		
        LightboxController.closeErrorAlert();
        
        LightboxController.displayLoginContainers();
        LightboxController.hideRegisterContainers();
		
		$('#register-animate-wrapper').animate( { height: '0px', opacity: '0' } , 500 );
		
		$('#register-view-register-btn').animate(
            { opacity: '0' }
            , 250
            , function(){
				$(this).css( 'display','none' );
				$('#login-view-register-btn').css( {
					'display':'block'
					, 'height':'30px'
				} ).animate( { opacity: '1' }, 450 );
		    }
        );
		
		$('#register-view-login-btn').animate(
            { opacity: '0' }
            , 250
            , function() {
				$(this).css( 'display','none' );
				$('#login-view-login-btn').css( {
					'display' : 'block'
					, 'height' : '30px'
				} ).animate( { opacity: '1' }, 450 );
		    }
        );
		
		$('#login-register-title').html('Login')
		
	}
    
    // show an error message between inputs and buttons
    , showAuthError : function( errorMessage ) {
        
		if( errorMessage == "Unauthorized" ) {
			errorMessage = "Invalid Password";
		}
		
        //Update error message
		$('#auth-error span').html( errorMessage );
		
		var alertWrapper = $('#auth-error-wrapper');
		
		alertWrapper.show();
		
		var animateH = $('#auth-error').outerHeight(true);
		
		alertWrapper.animate(
			{ 'height' : animateH }
			, 600
			, function() {
				alertWrapper.animate( { 'opacity' : 1 }, 200 );
		    }
        );
    }
    
    // display the authorization lightbox
    , showAuthLightbox : function( content ) {
        
        // display the lightbox
        jQuery(document).ready( function ($) {
            $('#lightbox-shadow').css('display','block');
      	    $("#lightbox-container").css('display','block');
			LightboxController.positionAuthLightbox();
			$(window).resize( function() {
				LightboxController.positionAuthLightbox();
			} );
        } );		
				
    }

    // close the authorization lightbox
    , closeAuthLightbox : function() {
				
        jQuery(document).ready( function ($) {
            $("#lightbox-container").css( 'display','none' );
			$("#lightbox-shadow").css( 'display', 'none' );
        } );
				
    }
    
    , showSaveLightbox : function() {
        
        $('#lightbox-shadow').css( 'display', 'block' );
  	    $("#lightbox-container").css( 'display', 'block' );
        
        $("#lightbox-login-register-container").css( 'display', 'none' );
        $("#save-deck-form").css( 'display', 'block' );
        
    }
    
    , closeSaveLightbox : function() {
        
        $('#lightbox-shadow').css( 'display', 'none' );
  	    $("#lightbox-container").css( 'display', 'none' );
        $("#save-deck-form").css( 'display', 'none' );
        
    }
    
    , toggleLoginRegisterLightbox : function() {
        $('#lightbox-login-register-container').toggle();
    }
    
    , showProfileSettingsController : function() {
        
        // show the profile settings form
		$('#profile-settings-form').toggle();
        
        // initialize the profile settings view (prepopulate the data and register a save callback)
        ProfileSettingsController.init();
        
    }
    
	, positionAuthLightbox : function() {
        /*
		var lightboxW = 350;
		var lightboxLeft = ( $(window).width() / 2 ) - ( lightboxW / 2 );
		$('#lightbox-container').css( 'left', lightboxLeft );
        */
    }
    
    , displayLoginContainers : function() {
		$('#login-username-container').css( 'display', 'block' );
		$('#login-password-container').css( 'display', 'block' );
    }
    
    , hideLoginContainers : function() {
		$('#login-username-container').css( 'display', 'none' );
		$('#login-password-container').css( 'display', 'none' );
    }
    
    , displayRegisterContainers : function() {
		$('#register-username-container').css( 'display', 'block' );
		$('#register-password-container').css( 'display', 'block' );
    }
    
    , hideRegisterContainers : function() {
		$('#register-username-container').css( 'display', 'none' );
		$('#register-password-container').css( 'display', 'none' );
    }
    
    , closeErrorAlert : function() {
        //close error alerts
		$('.alert .close').trigger('click');
    }
    
};

//Temporary, so I can remember where this is. 
$(document).ready(function(){
    
    //Turn on 'close' buttons for alerts
	$('.alert').alert();
	
	$('.alert .close').on("click", function(e) {
			
	    $(this).parent().parent().animate({
	    	"opacity":"0"
	    }, 200, function(){
	    	$(this).animate({
	    		"height" : "0px"
	    	}, 400, function(){
					$(this).hide();
	    	});
	    });
	});
	
	ThumbnailViewController.renderThumbnail( '260', '#profile-settings-thumbnail' );
	
	$('#profile-settings-image-input').tooltip();
	
});
