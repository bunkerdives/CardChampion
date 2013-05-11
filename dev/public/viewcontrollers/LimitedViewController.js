var LimitedViewController = {
	
	limitedLayout : function () {

		var $win = $(window);
		var windowHeight = $win.height();
		var windowWidth = $win.width();

		var previewWrapperH = ((windowHeight-35)*(ViewModel.topScreenCalcPercentage/100))-14;
		var previewWrapperW = (previewWrapperH*0.71935483870968); // Determine width via card ratio
		$('#preview-wrapper').css( {
			"width" : previewWrapperW
		} );
    
		var cardPoolWidth = (windowWidth-15)-previewWrapperW;
		$('#card-pool').css( {
			"width" : cardPoolWidth
		} );

		if (previewWrapperW < 260) {
			var ctrlBarLeftW = 260;
		} else {
			var ctrlBarLeftW = previewWrapperW;
		}
		$('#limited-control-bar-left').css("width", ctrlBarLeftW);
		var ctrlBarRightW = windowWidth - (ctrlBarLeftW + 10);
		$('#limited-control-bar-right').css("width", ctrlBarRightW);

		var sliderW = $('#card-size-slider').outerWidth(true);
		var controlBtnW = $('#control-bar-buttons').outerWidth(true);

		var previewImgH = previewWrapperH-6; // 6 = 3px margin-top + 3px margin-bottom
		var previewImgW = previewWrapperW-6;
		$('#img-preview').css( {
			"height" : previewImgH,
			"width" : previewImgW,
			"background-size" : previewImgW + "px " + previewImgH + "px"
		} );
    	
	}
	
	, limitedInit : function () {
		LimitedViewController.limitedLayout();
		VerticalOffsetViewController.offsetDragHandlers();
		HeaderViewController.headerLayout();
	}
	
}