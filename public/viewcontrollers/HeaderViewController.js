var HeaderViewController = {
	
	headerLayout : function() {
		ThumbnailViewController.renderThumbnail(57,'#header-profile-btn');
	
		var windowWidth = $(window).width();
	
		var tmpW = windowWidth * 0.95;
	
		if( tmpW >= 1080 ) {
			tmpW = 1080;
		}
	
		var headerContainerW = tmpW * 0.95;
	
		var headerLinksW = 244;
		var headerLinksNum = 4;
	
		var logoW = 272;
	
		var headerLinksSpacer = ((headerContainerW-headerLinksW-38)-logoW)/(headerLinksNum);
	
		if (headerLinksSpacer>=10){
			$(".header-link-spacer").css("width", headerLinksSpacer);
		} else {
			$(".header-link-spacer").css("width", 10);
		}
	}
	
}