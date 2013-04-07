function limitedLayout() {
	
	var $win = $(window);
	var windowHeight = $win.height();
	var windowWidth = $win.width();
	
	//var templateH = windowHeight-30-5; // 30 = header height, 5 = limited template padding-top
	
	//var halfScreenHeight = ( (templateH) / 2 ) - 14; // -14 for half of the 28px tall #control-bar
	
	//var halfScreenWidth = windowWidth;
	
	//var yOffsetNum = ViewModel.yOffset;
	//var topScreenHeight = (halfScreenHeight + (templateH/9))-yOffsetNum;
	//var bottomScreenHeight= (halfScreenHeight - (templateH/9))+yOffsetNum; 	
	
	// $('#top-screen').css( {
	// 	"height" : topScreenHeight
	// } );
	// $('#bottom-screen').css( {
	// 	"height" : bottomScreenHeight
	// } );
	
	//var previewWrapperH = topScreenHeight;
	var previewWrapperH = ((windowHeight-35)*.6)-14;
	var previewWrapperW = (previewWrapperH*0.71935483870968); // Determine width via card ratio
	$('#preview-wrapper').css( {
		// "height" : previewWrapperH,
		"width" : previewWrapperW
	} );
	
	//var cardPoolHeight = topScreenHeight;
	var cardPoolWidth = (windowWidth-15)-previewWrapperW;
	$('#card-pool').css( {
		// "height" : cardPoolHeight,
		"width" : cardPoolWidth
	} );
	// $('#card-pool-scroll').css("height", cardPoolHeight);
	
	
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

	//var deckAreaHeight = bottomScreenHeight-5; // 5 = deck-area bottom-padding
	//var deckAreaWidth = windowWidth-10; // 10 = 5px margin-left + 5px margin-right
	// $('#deck-area').css( {
	// 	"height" : deckAreaHeight,
	// 	"width" : deckAreaWidth
	// } );
	// $('#deck-area-scroll').css("height", deckAreaHeight);
	
	// $("#card-pool-inner").css( {
	// 	"min-width": cardPoolWidth - 3,
	// 	"min-height": cardPoolHeight
	// } );	
	// 
	// $("#deck-area-inner").css( {
	// 	"min-width": deckAreaWidth - 3,
	// 	"min-height": deckAreaHeight
	// } );
    	
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
			ViewModel.yOffsetOld = ViewModel.yOffset;
            ViewModel.poolViewController.fixPoolSize();
		}
	}).mousemove(function(e){
		if (ViewModel.yOffsetBool == true) {
			var yOffsetStart = ViewModel.yOffsetDragStart;
			var yOffsetEnd = e.pageY;
			var yOffsetDelta = yOffsetStart - yOffsetEnd;
			ViewModel.yOffset = ViewModel.yOffsetOld + yOffsetDelta;
			limitedLayout();
            ViewModel.poolViewController.fixPoolSize();
		}
	});
    
}

function limitedInit() {
	limitedLayout();
	offsetDragHandlers();
	$('.foyer-header').addClass('translucent-header');
	headerLayout();
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

