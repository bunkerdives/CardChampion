function showBuilder() {
	$('#splash').css("display", "none");
	$('#builder').css("display", "block");
	builderLayout();
}



function builderLayout() {
	//console.log('limitedLayout function called.');
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	var templateH = windowHeight-30-5;//30=header height, 5=limited template padding-top
	
	var halfScreenHeight = ((templateH)/2)-14;//-14 for half of the 28px tall #control-bar
	
	var halfScreenWidth = windowWidth;
	
	//var yOffsetNum = yOffset;
	//console.log("yOffsetNum: " + yOffsetNum);
	var topScreenHeight = (halfScreenHeight + (templateH/7));     //-yOffsetNum;
	var bottomScreenHeight= (halfScreenHeight - (templateH/7));    //+yOffsetNum; 	
	
	$('#top-screen').css({
		"height" : topScreenHeight
	});
	$('#bottom-screen').css({
		"height" : bottomScreenHeight
	});
	
	var previewWrapperH = topScreenHeight;
	var previewWrapperW = (previewWrapperH*0.71935483870968);//Determine width via card ratio
	$('#preview-wrapper').css({
		"height" : previewWrapperH,
		"width" : previewWrapperW
	});
	$('#builder-card-search').css({
		"height": bottomScreenHeight-5,
		"width": previewWrapperW
	});
	$('#builder-input').css('width', previewWrapperW-12);
	
	var addCardPromptImgW = previewWrapperW*0.5*0.9;
	var addCardPromptImgH = addCardPromptImgW/0.71935483870968;
	var addCardPromptImgTop = ((bottomScreenHeight-5)-addCardPromptImgH)/2;
	$('#add-card-thumbnail').css({
		"height" : addCardPromptImgH
		, "background-size" : addCardPromptImgW + "px " + addCardPromptImgH + "px"
		, "margin-top" : addCardPromptImgTop
	});
	$('#add-card-btns').css({
		"margin-top" : addCardPromptImgTop+10
	});
	
	var cardPoolHeight = topScreenHeight;
	var cardPoolWidth = (windowWidth-15)-previewWrapperW;
	$('#card-pool').css({
		"height" : cardPoolHeight,
		"width" : cardPoolWidth
	});
	$('#card-pool-scroll').css("height", cardPoolHeight);
	
	
	if (previewWrapperW < 260) {
		var ctrlBarLeftW = 260;
	} else {
		var ctrlBarLeftW = previewWrapperW;
	}
	$('#limited-control-bar-left').css("width", ctrlBarLeftW);
	var ctrlBarRightW = windowWidth - (ctrlBarLeftW + 10);
	$('#limited-control-bar-right').css("width", ctrlBarRightW);
	
	var sliderW = $('#card-size-slider').outerWidth(true);
	//console.log("sliderW: " + sliderW);
	var controlBtnW = $('#control-bar-buttons').outerWidth(true);
	//console.log("controlBtnW: " + controlBtnW);
	//var dragControllerW = windowWidth-(countersW+sliderW+controlBtnW)-15;
	//console.log("dragControllerW: " + dragControllerW);
	//$('#drag-y-controller').css("width", dragControllerW);
	
	
	var previewImgH = previewWrapperH-6;//6=3px margin-top + 3px margin-bottom
	var previewImgW = previewWrapperW-6;
	$('#img-preview').css({
		"height" : previewImgH,
		"width" : previewImgW,
		"background-size" : previewImgW + "px " + previewImgH + "px"
	});

	var deckAreaHeight = bottomScreenHeight-5;//5=deck-area bottom-padding
	var deckAreaWidth = windowWidth-10;//10= 5px margin-left + 5px margin-right
	$('#deck-area').css({
		"height" : deckAreaHeight,
		"width" : cardPoolWidth
	});
	$('#deck-area-scroll').css("height", deckAreaHeight);
	
	var cardPoolInnerHeight = 3000;//Arbitrary number, will be replaced by a calculation of inner dimensions
	var cardPoolInnerWidth= 3000;
	
	$("#card-pool-inner").css({
		"height" : cardPoolInnerHeight,
		"width" : cardPoolInnerWidth,
		"min-width": cardPoolWidth - 3,
		"min-height": cardPoolHeight
	});	
	
	$("#deck-area-inner").css({
		"height" : cardPoolInnerHeight,
		"width" : cardPoolInnerWidth,
		"min-width": cardPoolWidth - 3,
		"min-height": deckAreaHeight
	});	
}

$(document).ready(function(){
	
	
	
});

$(window).resize(function(){
	builderLayout();
});