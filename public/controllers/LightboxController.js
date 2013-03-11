var LightboxController = {
    
    // display the lightbox
    showLightbox : function( content ) {

    	// add lightbox/shadow <div/>'s if not previously added
    	if( $('#lightbox').size() == 0 ) {
    		var theLightbox = $('<div id="lightbox"/>');
    		var theShadow = $('<div id="lightbox-shadow"/>');
    		$('body').append(theShadow);
    		$('body').append(theLightbox);
    	}
        
        $("#lightbox-shadow").click( function() {
            //LightboxController.closeLightbox();
        } );

    	// remove any previously added content
    	$('#lightbox').empty();

    	// insert HTML content
    	if( content != null ) {
    		$('#lightbox').append( content );
    	}

    	// move the lightbox to the current window top + 100px
    	$('#lightbox').css( 'top', $(window).scrollTop() + 100 + 'px' );

    	// display the lightbox
    	$('#lightbox').show();
    	$('#lightbox-shadow').show();

    }

    // close the lightbox
    , closeLightbox : function() {

    	// hide lightbox and shadow <div/>'s
    	$('#lightbox').hide();
    	$('#lightbox-shadow').hide();

    	// remove contents of lightbox in case a video or other content is actively playing
    	$('#lightbox').empty();
    
    }
    
};