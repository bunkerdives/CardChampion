function limitedLayout() {

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

// Card size slider

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 500;

function cardSizeChange(slideAmount) {

	var standardH = 198.7; // standard card height
	var standardW = 143; // standard card width
	var newH = standardH * (slideAmount/100);
	var newW = standardW * (slideAmount/100);
	var marginTop = newH * -0.894;

	ViewModel.cardH = newH;
	ViewModel.cardW = newW;
	ViewModel.cardMarginTop = marginTop;

	ViewModel.poolViewController.fixPoolSize();

	$(".card").each( function() { //Change background size of cards to 0; add class .cardResize
		$(this).addClass('cardResize');
		$(this).css( {
			'background-size': '0px 0px',
			"height" : newH,
			"width" : newW,
			"margin-top" : marginTop
		} );
	} );

	$(".column").each( function() {
		$(this).css("margin-top", marginTop*-1);
	} );

	//Set timeout
	rtime = new Date();
  if (timeout === false) {
      timeout = true;
      setTimeout(cardSizeChangeEnd, delta);
  }
  
}

function cardSizeChangeEnd() {

  if (new Date() - rtime < delta) {
  	setTimeout(cardSizeChangeEnd, delta);
  } else {
  	timeout = false;
		var newW = ViewModel.cardW;
		var newH = ViewModel.cardH;
		var bgSize=newW + "px " + newH + "px";
		//remove .cardResize class, change the background size of these elements
		$( ".card" ).each(function() {//Change background size of cards to 0; add class .cardResize
			$(this).removeClass('cardResize');
			$(this).css({
				'background-size': bgSize
			});
		});
	}
}




function offsetDragHandlers() {
	$('#drag-offset-y').mousedown(function(e){
		ViewModel.yOffsetBool=true;
		$("body").addClass("no-select");
		$("body").addClass("ns-resize-cursor");
		ViewModel.yOffsetDragStart=e.pageY;
	});

	$(document).mouseup(function(){
		if (ViewModel.yOffsetBool == true) {
			ViewModel.yOffsetBool = false;
			$("body").removeClass("no-select");
			$("body").removeClass("ns-resize-cursor");
			ViewModel.topScreenCalcPercentageOld = ViewModel.topScreenCalcPercentage;
            ViewModel.poolViewController.fixPoolSize();
		}
	}).mousemove(function(e){
		if (ViewModel.yOffsetBool == true) {
			var yOffsetEnd = e.pageY;
			var yOffsetDelta = ViewModel.yOffsetDragStart - yOffsetEnd;
			console.log(yOffsetDelta);
			//ViewModel.yOffset = ViewModel.yOffsetOld + yOffsetDelta; //css calc failure fallback
			var percentageDelta = (yOffsetDelta/$(window).height()) * 100;
			var topScreenCalcPercentage = ViewModel.topScreenCalcPercentageOld - percentageDelta;
			var bottomScreenCalcPercentage = 100 - topScreenCalcPercentage;
			ViewModel.topScreenCalcPercentage = topScreenCalcPercentage;

			offsetCalc(topScreenCalcPercentage, bottomScreenCalcPercentage);
			limitedLayout();
            ViewModel.poolViewController.fixPoolSize();
		}
	});
    
}

function limitedInit() {
	limitedLayout();
	offsetDragHandlers();
	headerLayout();
}

function offsetCalc(topScreenPercentage, bottomScreenPercentage) {
	if (topScreenPercentage != '' && bottomScreenPercentage != '') {
		var partialCalcString = "% - 14px";
		var topScreenCalc = topScreenPercentage + partialCalcString;
		var bottomScreenCalc = bottomScreenPercentage + partialCalcString;

		$('#top-screen').css( {
			'height': '-webkit-calc(' + topScreenCalc + ')'
			, 'height': '-moz-calc(' + topScreenCalc + ')'
			, 'height': 'calc(' + topScreenCalc + ')'
		} );

		$('#bottom-screen').css( {
			'height': '-webkit-calc(' + bottomScreenCalc + ')'
			, 'height': '-moz-calc(' + bottomScreenCalc + ')'
			, 'height': 'calc(' + bottomScreenCalc + ')'
		} );
	}
}

$(document).ready(function(){
	CardViewController.cardSizeInit();
	$("#add-land-dropdown").on("click", function(e){
	  e.stopPropagation();
	});

	$('.card').on('touchStart', CardViewModel.cardSelect);

	var $win = $(window);
	$(window).resize(function() {
		if ( $(document.getElementById('limited')).length > 0 ) {//If #limited exists
			limitedLayout();
		}
	});

});