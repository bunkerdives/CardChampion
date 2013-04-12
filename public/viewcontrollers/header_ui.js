function headerLayout(){
	var windowWidth = $(window).width();
	var tmpW = windowWidth * 0.95;
	if (tmpW>1080) tmpW=1080;
	var headerContainerW = tmpW*0.95;
	$("#header-container").css("width", headerContainerW);
	var headerLinksW = 0;
	var headerLinksNum = 0;
	cardToThumbnail(36,'#header-profile-btn');
	$('.header-link').each(function() {
		headerLinksW += $(this).outerWidth();
		headerLinksNum++;
		//console.log('headerLinksW: ' + headerLinksW);
	});
	var logoW = $("#logo").outerWidth();
	var headerLinksSpacer = ((headerContainerW-headerLinksW-38)-logoW)/(headerLinksNum);
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