function headerLayout() {
    
	var windowWidth = $(window).width();
    
	var headerContainerW = windowWidth * 0.95 * 0.95;
	if( headerContainerW > 1026 ) {
        headerContainerW = 1080 * 0.95;
    }
    
	$('#header-container').css( 'width', headerContainerW );
    
	cardToThumbnail( 36, '#header-profile-btn' );
    
	var headerLinksW = 0;
	var headerLinksNum = 0;
	$('.header-link').each( function() {
		headerLinksW += $(this).outerWidth();
		++ headerLinksNum;
	} );
    
	var headerLinksSpacer = ( (headerContainerW - headerLinksW - 38) - $('#logo').outerWidth() ) / headerLinksNum;
    if( headerLinksSpacer < 10 ) {
        headerLinksSpacer = 10;
    }
    
	$('.header-link-spacer').css( 'width', headerLinksSpacer );
    
}

function headerInit(){
	headerLayout();
}

$(window).resize(function() {
	if( $('#header').css('display') == 'block' ) {
		headerLayout();
	}
});