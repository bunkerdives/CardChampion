function infoSlide(str,arr){
	console.log('infoSlide function called. arg1=' + str + ' arg2=' + arr);
	navEvents();
	var linkName = "#header-link-" + str;
	$(linkName).off();
	var links = arr;
	var id = "#info-" + str;
	var hideInfo1 = links[0];
	var hideInfo2 = links[1];
	var hideInfo3 = links[2];
	$(hideInfo1).css("display", "none");
	$(hideInfo2).css("display", "none");
	$(hideInfo3).css("display", "none");
	$(id).css("display", "block");
	$('#info-wrapper').animate({height:'439px'},1000);
}

function navClick(p){
	console.log('navClick function called. arg=' + p);
	//Array of all menus, then remove whichever was passed as an argument
	var links = ["#info-1", "#info-2", "#info-3", "#info-4"];
	var id = "#info-" + p;
	links = jQuery.grep(links, function(value) {
  	return value != id;
  });

	//Determine if wrapper is already open, if so animate it closed; then show proper menu and animate open
	var wrapperHeight = $('#info-wrapper').css("height");
	//alert(wrapperHeight);
	if (wrapperHeight != '0px') {
		$('#info-wrapper').animate({height:'0px'},1000, function(){
			infoSlide(p,links);
		});
	} else {
		infoSlide(p,links);
	}
}
			
function navEvents(){
	console.log('navEvents function called.');
  var arr = [1,2,3,4];
	$.each(arr, function(index, value) {
		$('#header-link-' + value).off();
		$('#header-link-' + value).click(function () {
			navClick(value);
		});
	});
}

function foyerLayout(){
	var windowWidth = $(window).width();
	//Foyer BG calculation should go here
	
	var foyerContainerW = windowWidth*0.95;
	if (foyerContainerW>1100) {
		foyerContainerW=1100;
	}
	var foyerContainerPaddedW = foyerContainerW-20;
	
	$("#open").css("width", foyerContainerPaddedW);
	var headerLinksW = 0;
	$('span.header-link').each(function() {
		headerLinksW += $(this).width();
		console.log('headerLinksW: ' + headerLinksW);
	});
	var headerLinksSpacer = (foyerContainerPaddedW-headerLinksW-143)/5;
	if (headerLinksSpacer>=13){
		$(".header-link-spacer").css("width", headerLinksSpacer);
	}
		
	$("#foyer-banner-wrapper").css("width", foyerContainerW);
	$("#foyer-banner").css("width", foyerContainerPaddedW);
	$("#foyer-content-container").css("width", foyerContainerW);
	$("#portal").css("width", foyerContainerPaddedW);
	$("#foyer-subcontent").css("width", foyerContainerW);
	$("#foyer-footer").css("width", foyerContainerW);
	
	var leftPaneW = (foyerContainerPaddedW*0.675); //#right-pane width, -10 for l&r padding
	$("#left-pane").css("width", leftPaneW);
	
	/*var foyerLinksW = 0;
	$('span.foyer-link').each(function() {
	    foyerLinksW += $(this).width();
	});
	var foyerLinksSpacer = (leftPaneW-foyerLinksW+20)/5;
	if (foyerLinksSpacer>=13){
		$(".foyer-link-spacer").css("width", foyerLinksSpacer);
	}*/
	
	var rightPaneWrapperW = (foyerContainerPaddedW - leftPaneW)-10; //#left-pane-wrapper width
	$("#right-pane-wrapper").css("width", rightPaneWrapperW);
	
	var rightPaneW = rightPaneWrapperW - 10;
	$("#right-pane").css("width", rightPaneW);
	
	var chatW = rightPaneW * 1;//#chat width
	$("#chat").css("width", chatW);
	
	var convoW = chatW ;//- 5//#convo width, #chat-input width
	$("#convo").css("width", convoW);
	$("#chat-input").css("width", convoW);
	
	var chatMsgW = convoW - 50 - 40; //#chat-msg width
	$("#chat-msg").css("width", chatMsgW);
	
	var userlistW = rightPaneW - chatW; //#userlist width
	$("#userlist").css("width", userlistW);
}

$(window).resize(function(){
	foyerLayout();
});