var LightboxController = {
	
	isVisible : false
	
	, currentSubview : 'Auth'
	
	, subviewCases : {
		
		'Auth' : function( action ) { 
			
			if( action === 'show' ) { 
				LightboxController.showAuthSubview() 
			} else { 
				LightboxController.closeAuthSubview() 
			}
			
		}
		, 'SaveDeck' : function( action ) { 
			
			if( action === 'show' ) {
				LightboxController.showSaveDeckSubview()
			} else {
				LightboxController.closeSaveDeckSubview()
			}
			
		}
		, 'ProfileSettings' : function( action ) {
			
			if( action === 'show' ) {
				LightboxController.showProfileSettingsSubview() 
			} else {
				LightboxController.closeProfileSettingsSubview()
			}
			
		}
		
	}
	
	, showLightbox : function( subview ) {
		
		console.log('showLightbox, subview: ' + subview)
		this.isVisible = true;
        $('#lightbox-shadow').show();
  	    $("#lightbox-container").show();
		LightboxController.positionLightbox();
		
		this.currentSubview = subview;
		
		var subviewCase = this.subviewCases[ this.currentSubview ];
		
		if( subviewCase ) { 
			subviewCase( 'show' );
		} else {
			console.log('Error: Subview name not recognized by LightboxController.showLightbox().');
		}
		
	}
	
    , closeLightbox : function() {
		
		console.log('closeLightbox')
		this.isVisible = false;
		
        $("#lightbox-container").hide();
		$("#lightbox-shadow").hide();
		
		var subviewCase = this.subviewCases[ this.currentSubview ];
		
		if( subviewCase ) { 
			subviewCase( 'close' );
		} else {
			console.log('Error: Subview name not recognized by LightboxController.closeLightbox().');
		}
		
    }
	
	, showAuthSubview : function() {
		
		console.log('showAuthSubview')
		$("#lightbox-login-register-container").show();
		
        LightboxController.displayLoginContainers();
        LightboxController.hideRegisterContainers();
		
	}
	
	
	, showSaveDeckSubview : function() {
		
		console.log('showSaveDeckSubview')
		$("#save-deck-form").show();
		
	}
	
	, showProfileSettingsSubview : function() {
		
		console.log('showProfileSettingsSubview')
		$("#profile-settings-form").show();
		ProfileSettingsController.init();
		
		ThumbnailViewController.renderThumbnail( '260', '#profile-settings-thumbnail' );
	
		$('#profile-settings-image-input').tooltip();
		
	}
	
	, closeAuthSubview : function() {
		
		console.log('closeAuthSubview')
		$("#lightbox-login-register-container").hide();
		
	}
	
	, closeSaveDeckSubview : function() {
		
		console.log('closeSaveDeckSubview')
		$("#save-deck-form").hide();
		
	}
	
	, closeProfileSettingsSubview : function() {
		
		console.log('closeProfileSettingsSubview')
		$("#profile-settings-form").hide();
		
	}
	
	, showRegisterForm : function() {
		
		console.log('showRegisterForm')
		
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
		
		$('#login-register-title').html('Signup');
		
	}

	, showLoginForm : function() {
		
		console.log('showLoginForm')
		
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

	, positionLightbox : function() {
		
		console.log('positionLightbox')
        /*
		var lightboxW = 350;
		var lightboxLeft = ( $(window).width() / 2 ) - ( lightboxW / 2 );
		$('#lightbox-container').css( 'left', lightboxLeft );
        */
    }
    
    , displayLoginContainers : function() {
		$('#login-username-container').show();
		$('#login-password-container').show();
    }
    
    , hideLoginContainers : function() {
		$('#login-username-container').hide();
		$('#login-password-container').hide();
    }
    
    , displayRegisterContainers : function() {
		$('#register-username-container').show();
		$('#register-password-container').show();
    }
    
    , hideRegisterContainers : function() {
		$('#register-username-container').hide();
		$('#register-password-container').hide();
    }
    
    , closeErrorAlert : function() {
        console.log('closeErrorAlert')
		$('.alert .close').trigger('click');
    }
    
};

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
	
});
