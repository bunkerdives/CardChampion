// Auto append to chat
var interval = self.setInterval(appendChat,500);
var i = 0;
function appendChat() {
	var convo = $("#chat-convo-wrapper");
	var convoInner = $("#chat-convo"); 
	var atBottom = ( convoInner.outerHeight() - convo.scrollTop() ) <=  convo.height();
	var msg = "<div class='chat-msg'><span class='chat-username' style='color:red;'>Username 1:</span><span>Test" + i + "</span></div>";
	convoInner.append(msg);
	if( atBottom ){
		convo.stop().animate({ scrollTop: convo[0].scrollHeight }, 300);
	}
	++i;
}

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

function positionLightbox() {

	if ($(window).width()>600) {
		var lightboxW = 600;
	} else {
		var lightboxW = $(window).width();
	}

	var lightboxLeft = ($(window).width()/2)-(lightboxW/2);
			
	$('#lightbox-container').css('left', lightboxLeft);
    
}

function profileLayout() {
	var contentW = $('#main-animate-wrapper').width();
	//console.log('contentW: ' + contentW);
	var leftColW = (contentW-20)*0.35;
	var profileImgH = leftColW * 0.7252;
	var imgBgW = leftColW * 1.2252;
	var imgBgH = imgBgW * 1.39;
	var imgBgTop = imgBgH * -0.1258;
	var imgBgLeft = imgBgW * -0.091;
	$('#profile-image').css({
		'height': profileImgH,
		'background-size': imgBgW + "px " + imgBgH + "px",
		'background-position': imgBgLeft + "px " + imgBgTop + "px"
	});
	
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
	
}

function foyerInit(){ 
	//foyerLayout();
	var headerExists = $("#header").css("display");
	if (headerExists=="none"){
		$("#header").css("display", "block");//Show header on foyer init
		headerInit();
	}
	profileLayout();
}

$(window).resize(function(){
	/*var foyerExists = $("#foyer").length;
	if (foyerExists==1) {
		foyerLayout();
	}*/
	profileLayout();
	if( $('#lightbox-container').size() > 0 ) {
		positionLightbox();
	}
	
	//Temporary bg resize
	var bgSrc = $("body").css("background-image");
	if ( bgSrc === "url(http://media.wizards.com/images/magic/daily/wallpapers/Moat_MTGOweek_1920x1080_Wallpaper.jpg)") {
		bgStretch('http://media.wizards.com/images/magic/daily/wallpapers/Moat_MTGOweek_1920x1080_Wallpaper.jpg',1920,1080,1920,973,0,39);
	}
});