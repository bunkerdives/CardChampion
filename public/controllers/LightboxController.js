var LightboxController = {
	
		positionAuthLightbox : function() {
			//console.log('positionAuthLightbox function called.')
			var lightboxW = 350;
			var lightboxLeft = ($(window).width()/2)-(lightboxW/2);
			$('#lightbox-container').css('left', lightboxLeft);
	  }
		
		, showRegisterForm : function() {
			
			$('.alert .close').trigger('click');//close error alerts
			
			$('#login-username-container').css('display', 'none');
			$('#login-password-container').css('display', 'none');
			$('#register-username-container').css('display', 'block');
			$('#register-password-container').css('display', 'block');
			
			$('#register-animate-wrapper').animate({
			    height: '111px'
					, opacity: '1'
			}, 600);
			
			$('#login-view-register-btn').animate({
				opacity: '0'
			}, 250, function(){
				$(this).css('display','none');
				$('#register-view-register-btn').css({
					'display':'block'
					,'height': '30px'
				}).animate({
					opacity: '1'
				}, 450);
			});
		
			$('#login-view-login-btn').animate({
				opacity: '0'
			}, 250, function(){
				$(this).css('display','none');
				$('#register-view-login-btn').css({
					'display': 'block',
					'height': '30px'
				}).animate({
					opacity: '1'
				}, 450);
			});
			
		}

		, showLoginForm : function() {
			
			$('.alert .close').trigger('click');//close error alerts
			
			$('#register-username-container').css('display', 'none');
			$('#register-password-container').css('display', 'none');
			$('#login-username-container').css('display', 'block');
			$('#login-password-container').css('display', 'block');
			
			$('#register-animate-wrapper').animate({
			    height: '0px'
					, opacity: '0'
			}, 500);
			
			$('#register-view-register-btn').animate({
				opacity: '0'
			}, 250, function(){
				$(this).css('display','none');
				$('#login-view-register-btn').css({
					'display':'block',
					'height':'30px'
				}).animate({
					opacity: '1'
				}, 450);
			});
			
			$('#register-view-login-btn').animate({
				opacity: '0'
			}, 250, function(){
				$(this).css('display','none');
				$('#login-view-login-btn').css({
					'display':'block',
					'height':'30px'
				}).animate({
					opacity: '1'
				}, 450);
			});
		}
    
    // display the lightbox
    , showAuthLightbox : function( content ) {
			
			console.log('showAuthLightbox');
    	
    	// display the lightbox
			$('#lightbox-shadow').css('display','block');
    	$('#lightbox-container').css('display','block');
        
      jQuery(document).ready(function ($) {
      	$("#lightboxcontainer").css('display','block');
				LightboxController.positionAuthLightbox();
				$(window).resize(function(){
					LightboxController.positionAuthLightbox();
				});
      });
				
				
    }
		
    // show an error message between inputs and buttons
    , showAuthError : function( message ) {
				console.log('showAuthError function called.');
				var errorMessage = message;
				
				if ( errorMessage === "Unauthorized" ) {
					errorMessage = "Invalid Password";
				}
				
				$('#auth-error span').html(errorMessage);//Update error message
				
				var alertWrapper = $('#auth-error-wrapper');
				
				alertWrapper.show();
				
				var animateH = $('#auth-error').outerHeight(true);
				
				alertWrapper.animate(
					{ 'height' : animateH }
					, 600
					, function() {
						alertWrapper.animate( 
							{ 'opacity' : 1 }
							, 200);
					} );
    }

    // close the lightbox
    , closeAuthLightbox : function() {
				
        jQuery(document).ready(function ($) {
            $("#lightbox-container").css('display','none');
						$("#lightbox-shadow").css('display', 'none');
        } );
				
    }
    
};

//Temporary, so I can remember where this is. 

$(document).ready(function(){
	$('.alert').alert();//Turn on 'close' buttons for alerts
	
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
	
	cardToThumbnail('260','#profile-settings-thumbnail');
	
	$('#profile-settings-image-input input').tooltip();
	
});
