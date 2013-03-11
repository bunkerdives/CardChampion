/* Auto append to chat
var interval = self.setInterval(appendChat,500);
function appendChat() {
	var convo = $("#convo");
	var convoInner = $("#convo-inner"); 
	var atBottom = ( convoInner.outerHeight() - convo.scrollTop() ) <=  convo.height();
	var msg = "<div class='chat-msg'><span class='chat-username' style='color:red;'>Username 1:</span><span>Test" + i + "</span></div>";
	convoInner.append(msg);
	if( atBottom ){
		convo.stop().animate({ scrollTop: convo[0].scrollHeight }, 400);
	}
	++i;
}*/

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

function foyerInit(){ 
	//foyerLayout();
	var headerExists = $("#header").css("display");
	if (headerExists=="none"){
		$("#header").css("display", "block");//Show header on foyer init
		headerInit();
	}
}

$(window).resize(function(){
	/*var foyerExists = $("#foyer").length;
	if (foyerExists==1) {
		foyerLayout();
	}*/
	if( $('#lightbox-container').size() > 0 ) {
		positionLightbox();
	}
});