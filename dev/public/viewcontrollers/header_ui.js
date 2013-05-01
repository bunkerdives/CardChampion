function headerLayout(){
	var windowWidth = $(window).width();
	//console.log('windowWidth: ' + windowWidth)
	var tmpW = windowWidth * 0.95;
	//console.log('tmpW: ' + tmpW)
	if (tmpW>=1080) tmpW=1080;
	//console.log('tmpW: ' + tmpW)
	var headerContainerW = tmpW*0.95;
	//console.log('headerContainerW: ' + headerContainerW)
	$("#header-container").css("width", headerContainerW);
	var headerLinksW = 244;
	var headerLinksNum = 5;
	cardToThumbnail(36,'#header-profile-btn');
	// console.log('Test: ' + $('.header-link').width() );
// 	$('.header-link').each(function() {
// 		headerLinksW = headerLinksW + $(this).width();
// 		
// 		headerLinksNum++;
// 		console.log('headerLinksNum: ' + headerLinksNum)
// 		console.log('this: ' + this)
// 		console.log('headerLinksW: ' + headerLinksW)
// 		//console.log('headerLinksW: ' + headerLinksW);
// 	});
	//console.log('headerLinksNum: ' + headerLinksNum)
	var logoW = 190;
	//console.log('logoW: ' + logoW)
	var headerLinksSpacer = ((headerContainerW-headerLinksW-38)-logoW)/(headerLinksNum);
	//console.log('headerLinksSpacer: ' + headerLinksSpacer)
	if (headerLinksSpacer>=10){
		$(".header-link-spacer").css("width", headerLinksSpacer);
	} else {
		$(".header-link-spacer").css("width", 10);
	}
}

function headerInit(){
	headerLayout();
}

$(window).resize(function() {
	var headerExists = $("#header").css("display");
	if (headerExists=="block") {
		headerLayout();
	}
});