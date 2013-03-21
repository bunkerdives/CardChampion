var LightboxController = {
    
    // display the lightbox
    showAuthLightbox : function( content ) {
    	positionLightbox();

    	// display the lightbox
		$('#lightbox-shadow').show();
    	$('#lightbox-container').show();
        
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