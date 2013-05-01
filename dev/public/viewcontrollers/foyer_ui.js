function showCustomSealedForm() {
	console.log('showCustomSealedForm function called.');
	var $menuRight = $('#sealed-menu-right');
	var $menuLeft = $('#sealed-menu-left');
	
	$menuRight.animate( {
		'margin-left' : 0
	}
	, 500
	, function() {
		$menuRight.css('margin-right', 0);
		$menuRight.addClass('pull-left');
		$menuLeft.css('width', '50%');
		$menuLeft.animate( {
			'opacity' : '1'
		}
		, 500
		, 'linear'
		, function() {
			
		} );
	} );
}

function profileLayout() {
    
	var contentW = $('#main-animate-wrapper').width();
	var leftColW = (contentW-20)*0.35;
	
	var target = '#profile-image';
	cardToThumbnail(leftColW,target);
	
	var deckImgH = 174.812;
	var deckImgW = deckImgH * 0.71935;
	var deckImgTop = deckImgH * -0.1258;
	var deckImgLeft = deckImgW * -0.15;
	$('.deck-preview-img').css({
		'background-size': deckImgW + "px " + deckImgH + "px",
		'background-position': deckImgLeft + "px " + deckImgTop + "px"
	});
	
	cardToThumbnail(67,'#deck-view-thumbnail');
}

function cardToThumbnail(w,t) {
	var imgW = w;
	var target = t;
	var profileImgH = imgW * 0.7252;
	var imgBgW = imgW * (1.2252+.1);
	var imgBgH = imgBgW * 1.39;
	var imgBgTop = imgBgH * (-0.1258-.01);
	var imgBgLeft = imgBgW * -0.097;
    
	$(target).css( {
		'height': profileImgH,
		'background-size': imgBgW + "px " + imgBgH + "px",
		'background-position': imgBgLeft + "px " + imgBgTop + "px"
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
  	'top' : event.pageY -20
  	, 'left' : event.pageX + 20
  });
}


function showPreviewCard(t,c) {
	
	var target = t;
	
	$('#card-preview-container').css("background-image", target);
	$('#card-preview-container').css('display', 'block');
	$('#card-preview-container').stop().animate({ opacity: 1 }, 300);
 
	positionPreviewCard();
	$('body').mousemove(function(){
		positionPreviewCard();
	});
	
}

function hidePreviewCard() {
	$('#card-preview-container').stop().animate({ opacity: 0 }, 300, function(){
		$('#card-preview-container').css('display', 'none');
		$('body').off('mousemove');
		touchEvent = false;
	});
}


function tabletPreviewEvent(t,c) {
	clearTimeout(ViewModel.hidePreviewTimeout);
	//hidePreviewCard();
	ViewModel.hidePreviewTimeout = setTimeout(function() {
		hidePreviewCard();
	}, 1000);
	$('#card-preview-container').css( {
  		'top' : event.pageY - 20
  		, 'left' : event.pageX + 20
  	});
	showPreviewCard( t, c );
}

var touchEvent;
function cardPreviewEvent() {
	
	
	$('.deck-view-section a').mouseenter(function() {
        console.log("cardPreviewEvent " + $(this).attr("data-img"))
		showPreviewCard( $(this).attr("data-img"), false );
	}).mouseleave(function(){
		hidePreviewCard();
	});
	
}
/* Card Preview End */

function foyerInit(){ 
	//foyerLayout();
	var headerExists = $("#header").css("display");
	if (headerExists=="none"){
		$("#header").css("display", "block");//Show header on foyer init
		headerInit();
	}
	profileLayout();
	cardPreviewEvent();
	$('.foyer-header').removeClass('translucent-header');
}

$(document).ready(function($){
	cardToThumbnail(50,'.deck-preview-img');
});

$(window).resize(function(){

	profileLayout();

	BackgroundController.setBackgroundImage();
});
