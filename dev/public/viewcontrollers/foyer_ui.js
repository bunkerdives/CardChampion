function profileLayout() {
    
	var contentWidth = $('#main-animate-wrapper').width();
	var leftColW = ( contentWidth - 20 ) * 0.35;
	
	cardToThumbnail( leftColW, '#profile-image' );
	
	var deckImgH = 174.812;
	var deckImgW = deckImgH * 0.71935;
	var deckImgTop = deckImgH * -0.1258;
	var deckImgLeft = deckImgW * -0.15;
    
	$('.deck-preview-img').css( {
		'background-size' : deckImgW + 'px ' + deckImgH + 'px'
		, 'background-position' : deckImgLeft + 'px ' + deckImgTop + 'px'
	} );
	
	cardToThumbnail( 67, '#deck-view-thumbnail' );
    
}

function cardToThumbnail( imgW, target ) {
    
	var profileImgH = imgW * 0.7252;
	var imgBgW = imgW * ( 1.2252 + .1 );
	var imgBgH = imgBgW * 1.39;
	var imgBgTop = imgBgH * ( -0.1258 - .01 );
	var imgBgLeft = imgBgW * -0.097;
    
	$(target).css( {
		'height' : profileImgH
		, 'background-size' : imgBgW + 'px ' + imgBgH + 'px'
		, 'background-position' : imgBgLeft + 'px ' + imgBgTop + 'px'
	} );
    
}


function showChatUserlist() {
	$('#chat').toggle();
	$('#userlist').toggle();
	$('#chat-msg').toggle();
	$('#chat-send-btn').toggle();
	$('#chat-user-total').toggle();
	$('#userlist-toggle-btn i').toggleClass('icon-user');
	$('#userlist-toggle-btn i').toggleClass('icon-comment');
}



/* Card Preview Start */
function positionPreviewCard() {
	$('#card-preview-container').css( {
  	    'top' : event.pageY - 20
  	    , 'left' : event.pageX + 20
    } );
}


function showPreviewCard( target ) {
	
    var container = $('#card-preview-container');
	container.css( 'background-image', target );
	container.css( 'display', 'block' );
	container.stop().animate( { opacity : 1 }, 300 );
    
    positionPreviewCard();
    
	$('body').mousemove( positionPreviewCard );
    
}

function hidePreviewCard() {
	$('#card-preview-container').stop().animate(
        { opacity : 0 }
        , 300
        , function() {
    		$('#card-preview-container').css( 'display', 'none' );
    		$('body').off( 'mousemove' );
	    }
    );
}


function tabletPreviewEvent( target ) {
    
	clearTimeout( ViewModel.hidePreviewTimeout );
	
	ViewModel.hidePreviewTimeout = setTimeout( hidePreviewCard, 1000 );
    
	$('#card-preview-container').css( {
  		'top' : event.pageY - 20
  		, 'left' : event.pageX + 20
  	} );
    
	showPreviewCard( target );
    
}

function cardPreviewEvent() {
	
	$('.deck-view-section a')
        .mouseenter( function() {
    		showPreviewCard( $(this).attr('data-img') );
    	} )
        .mouseleave( hidePreviewCard );
	
}
/* Card Preview End */

function foyerInit(){ 
    
    var header = $('#header');
	if( header.css('display') === 'none' ) {
        // show header on foyer init
		header.css('display', 'block');
		headerInit();
	}
    
	profileLayout();
	cardPreviewEvent();
    
	$('.foyer-header').removeClass('translucent-header');
    
}

$(document).ready( function($) {
	cardToThumbnail( 50, '.deck-preview-img' );
} );

$(window).resize(function(){
	profileLayout();
	//Temporary bg resize
	BackgroundController.setBackgroundImage();
});