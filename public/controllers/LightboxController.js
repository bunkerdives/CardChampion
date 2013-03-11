var LightboxController = {
    
    // display the lightbox
    showLightbox : function( content ) {

    	// add lightbox/shadow <div/>'s if not previously added
    	if( $('#lightbox-container').size() == 0 ) {
    		var theLightbox = $('<div id="lightbox-container"><div id="lightbox-inner"/></div>');
    		var theShadow = $('<div id="lightbox-shadow"/>');
    		$('body').append(theShadow);
    		$('body').append(theLightbox);
    	}
        
        $("#lightbox-shadow").click( function() {
            //LightboxController.closeLightbox();
        } );

    	// remove any previously added content
    	$('#lightbox-inner').empty();

    	// insert HTML content
    	if( content != null ) {
    		$('#lightbox-inner').append( content );
    	}

    	positionLightbox();

    	// display the lightbox
			$('#lightbox-shadow').show();
    	$('#lightbox-container').show();

    }

    // close the lightbox
    , closeLightbox : function() {

    	// hide lightbox and shadow <div/>'s
    	$('#lightbox-container').hide();
    	$('#lightbox-shadow').hide();

    	// remove contents of lightbox in case a video or other content is actively playing
    	$('#lightbox-inner').empty();
    
    }
    
};