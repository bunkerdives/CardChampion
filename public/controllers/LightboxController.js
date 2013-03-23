var LightboxController = {
	
		positionAuthLightbox : function() {
			//console.log('positionAuthLightbox function called.')
			var lightboxW = 350;
			var lightboxLeft = ($(window).width()/2)-(lightboxW/2);
			$('#authlightbox-container').css('left', lightboxLeft);
	  }
		
		, showRegisterForm : function() {
            
			$('#login-username-container').css('display', 'none');
			$('#login-password-container').css('display', 'none');
			$('#register-username-container').css('display', 'block');
			$('#register-password-container').css('display', 'block');
			
			$('#register-animate-wrapper').animate({
			    height: '111px'
			}, 500);
			
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
			
			$('#register-username-container').css('display', 'none');
			$('#register-password-container').css('display', 'none');
			$('#login-username-container').css('display', 'block');
			$('#login-password-container').css('display', 'block');
			
			$('#register-animate-wrapper').animate({
			    height: '0px'
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