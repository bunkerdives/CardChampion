
/*function foyerLayout(){
	console.log('foyerLayout function called.');
	var windowWidth = $(window).width();
	//Foyer BG calculation should go here
	
	var foyerContainerW = windowWidth*0.95;
	if (foyerContainerW>1100) {
		foyerContainerW=1100;
	}
	var foyerContainerPaddedW = foyerContainerW-20;
	//$("#foyer-content-container").css("width", foyerContainerW);
	//$("#foyer-banner-wrapper").css("width", foyerContainerW);
	//$("#foyer-banner").css("width", foyerContainerPaddedW);
	//$("#portal").css("width", foyerContainerPaddedW);
	//$("#foyer-subcontent").css("width", foyerContainerPaddedW);
	//$("#foyer-footer").css("width", foyerContainerPaddedW);
	
	var leftPaneW = (foyerContainerPaddedW*0.675); //#right-pane width, -10 for l&r padding
	//$("#left-pane").css("width", leftPaneW);
	
	var foyerLinksW = 0;
	$('span.foyer-link').each(function() {
	    foyerLinksW += $(this).width();
	});
	var foyerLinksSpacer = (leftPaneW-foyerLinksW+20)/5;
	if (foyerLinksSpacer>=13){
		$(".foyer-link-spacer").css("width", foyerLinksSpacer);
	}
	
	var rightPaneWrapperW = (foyerContainerPaddedW - leftPaneW)-10; //#left-pane-wrapper width
	//$("#right-pane-wrapper").css("width", rightPaneWrapperW);
	
	var rightPaneW = rightPaneWrapperW - 11;
	$("#right-pane").css("width", rightPaneW);
	
	var chatW = rightPaneW * 1;//#chat width
	//$("#chat").css("width", chatW);
	
	var convoW = chatW ;//- 5//#convo width, #chat-input width
	//$("#convo").css("width", convoW);
	//$("#chat-input").css("width", convoW);
	
	var chatMsgW = convoW - 50 - 40; //#chat-msg width
	//$("#chat-msg").css("width", chatMsgW);
	
	var userlistW = rightPaneW - chatW; //#userlist width
	//$("#userlist").css("width", userlistW);
}*/

function profileLayout() {
    
	var contentW = $('#main-animate-wrapper').width();
	var leftColW = (contentW-20)*0.35;
	
	/*var profileImgH = leftColW * 0.7252;
	var imgBgW = leftColW * 1.2252;
	var imgBgH = imgBgW * 1.39;
	var imgBgTop = imgBgH * -0.1258;
	var imgBgLeft = imgBgW * -0.091;
    
	$('#profile-image').css({
		'height': profileImgH,
		'background-size': imgBgW + "px " + imgBgH + "px",
		'background-position': imgBgLeft + "px " + imgBgTop + "px"
	});*/
	
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
	
	/*var navW = $('#profile-nav').width();
	var navSpacerW = (navW-222)/4;
	$( ".profile-link" ).each(function() {
	  $(this).css("margin-left", navSpacerW);
	});*/
	
	cardToThumbnail(50,'#deck-view-thumbnail');
}

function cardToThumbnail(w,t) {
	var imgW = w;
	var target = t;
	var profileImgH = imgW * 0.7252;
	var imgBgW = imgW * (1.2252+.1);
	var imgBgH = imgBgW * 1.39;
	var imgBgTop = imgBgH * (-0.1258-.01);
	var imgBgLeft = imgBgW * -0.091;
    
	$(target).css({
		'height': profileImgH,
		'background-size': imgBgW + "px " + imgBgH + "px",
		'background-position': imgBgLeft + "px " + imgBgTop + "px"
	});
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
	
	if( c == true) {
		clearTimeout(ViewModel.hidePreviewTimeout);
		ViewModel.hidePreviewTimeout = setTimeout(function() {
			hidePreviewCard();
		}, 5000);
	}
	$('#card-preview-container').css('display', 'block');
	$('#card-preview-container').stop().animate({ opacity: 1 }, 300);
    
    //var imgUrl = target.css("background-image");
    //console.log("showPreviewCard imgUrl = " + imgUrl)
    //var newHtml = $('<div style="background-image:' + imgUrl + '"></div>');
    
	//$('#card-preview-container').html(target);
    $('#card-preview-container').css("background-image", target);
    //$('#card-preview-container').html( newHtml );
    
	positionPreviewCard();
	$('body').mousemove(function(){
		positionPreviewCard();
	});
	
}

function hidePreviewCard() {
	$('#card-preview-container').stop().animate({ opacity: 0 }, 300, function(){
		$('#card-preview-container').css('display', 'none');
		$('#card-preview-container').empty();
		$('body').off('mousemove');
	});
}

function cardPreviewEvent() {
	$('.deck-view-section a').mouseenter(function() {
        console.log("cardPreviewEvent " + $(this).attr("data-img"))
		showPreviewCard( $(this).attr("data-img"), false );
	}).mouseleave(function(){
		hidePreviewCard();
	}).click(function(){
		showPreviewCard( $(this).attr("data-img"), true );
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
	/*var foyerExists = $("#foyer").length;
	if (foyerExists==1) {
		foyerLayout();
	}*/
	profileLayout();
	/*if( $('#lightbox-container').size() > 0 ) {
		positionAuthLightbox();
	}*/
	
	//Temporary bg resize
	var bgSrc = $("body").css("background-image");
	if ( bgSrc === "url(http://media.wizards.com/images/magic/daily/wallpapers/Moat_MTGOweek_1920x1080_Wallpaper.jpg)") {
		BackgroundController.stretchBackground('http://media.wizards.com/images/magic/daily/wallpapers/Moat_MTGOweek_1920x1080_Wallpaper.jpg',1920,1080,1920,973,0,39);
	}
});