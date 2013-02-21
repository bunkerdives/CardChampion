function tabtest() {
	
	$("#tab1").removeClass("active");
	$("#tab1").removeClass("well");
	$("#tab2").addClass("active");
	$("#tab2").addClass("well");
}

function foyerLayout(){
	var windowWidth = $(window).width();
	//Foyer BG calculation should go here
	
	var foyerContainerW = windowWidth*0.95;
	if (foyerContainerW>975) {
		foyerContainerW=975;
	}
	$("#foyer-content-container").css("width", foyerContainerW);
	$("#portal").css("width", foyerContainerW);
	$("#foyer-subcontent").css("width", foyerContainerW);
	$("#foyer-footer").css("width", foyerContainerW);
	
	var leftPaneWrapperW = (foyerContainerW*0.7); //#left-pane-wrapper width
	$("#left-pane-wrapper").css("width", leftPaneWrapperW);
	
	var leftPaneW = leftPaneWrapperW - 20;
	$("#left-pane").css("width", leftPaneW);
	
	var chatW = leftPaneW * 0.65;//#chat width
	$("#chat").css("width", chatW);
	
	var convoW = chatW - 5;//#convo width, #chat-input width
	$("#convo").css("width", convoW);
	$("#chat-input").css("width", convoW);
	
	var chatMsgW = convoW - 50; //#chat-msg width
	$("#chat-msg").css("width", chatMsgW);
	
	var userlistW = leftPaneW - chatW; //#userlist width
	$("#userlist").css("width", userlistW);
	
	var rightPaneW = (foyerContainerW - leftPaneWrapperW) - 10; //#right-pane width, -10 for l&r padding
	$("#right-pane").css("width", rightPaneW);
	var rightColW = rightPaneW+10;
}

$(window).resize(function(){
	foyerLayout();
});