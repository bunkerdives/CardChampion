function screenSize() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	if($('#open').is(":visible")){
		//if header is open
		var headerHeight = 50;
	} else {
		//if header is closed
		var headerHeight = 20;
	}
	
	var halfScreenHeight = ((windowHeight-headerHeight)/2)-22;//-22 for half of the 44px tall #control-bar
	var halfScreenWidth = windowWidth;
	var topScreenHeight = halfScreenHeight + ((windowHeight-headerHeight)/9);
	var bottomScreenHeight= halfScreenHeight - ((windowHeight-headerHeight)/9);	
	$('#top-screen').css({
		"height" : topScreenHeight - 2, //for bottom border
		"width" : halfScreenWidth 
	});
	$('#bottom-screen').css({
		"height" : bottomScreenHeight,
		"width" : halfScreenWidth
	});
	
	var previewHeight = topScreenHeight-10;//5 for bottom and 5 for top margin on #img-preview
	var previewWidth = (previewHeight*0.71935483870968);//Determine width via card ratio
	$('#img-preview').css({
		"height" : previewHeight,
		"width" : previewWidth,
		"background-size" : previewWidth + "px " + previewHeight + "px"
	});
	
	var cardPoolHeight = topScreenHeight - 2;//for bottom border on #top-screen
	var cardPoolWidth = (windowWidth-10)-previewWidth;//5 for left margin on #img-preview, 5 for margin between #img-preview and #card-pool
	$('#card-pool').css({
		"height" : cardPoolHeight,
		"width" : cardPoolWidth
	});
	$('#card-pool-scroll').css("height", cardPoolHeight);

	var deckAreaHeight = bottomScreenHeight;
	var deckAreaWidth = windowWidth;
	$('#deck-area').css({
		"height" : deckAreaHeight,
		"width" : deckAreaWidth
	});
	$('#deck-area-scroll').css("height", deckAreaHeight);
	
	
	
	
	var cardHeight = $('#card-pool-0-0').height();//standard height
	var cardWidth = $('#card-pool-0-0').width();//standard width
	
	var cardPoolInnerHeight = ((cardHeight * Sealed.numRows)-(178 * (Sealed.numRows - 1))) + 3;//178 for negative margin-top on each .card, 3 for padding top on #card-pool-row-0/3 for bottom padding
	var cardPoolInnerWidth = (cardWidth * Sealed.numCols) + (3 * Sealed.numCols);//3 for left padding on each column
	
	$("#card-pool-inner").css({
		"height" : cardPoolInnerHeight,
		"width" : cardPoolInnerWidth,
		"min-width": cardPoolWidth - 3,
		"min-height": cardPoolHeight
	});	
	
	$("#deck-area-inner").css({
		"height" : cardPoolInnerHeight,
		"width" : cardPoolInnerWidth,
		"min-width": deckAreaWidth - 3,
		"min-height": deckAreaHeight
	});	
}

function cardSizeInit(){
	var cardHeight = 198.7;//standard height
	var cardWidth = 143;//standard width
	
	$(".card").css({
		"height" : cardHeight,
		"width" : cardWidth,
		"background-size" : cardWidth + "px " + cardHeight + "px"
	});	
	

}

function destroyScroll(id){
	var element = $(id).jScrollPane();
	var api = element.data('jsp');
	api.destroy();
}

function initScreen() {
	$("#card-pool-scroll").jScrollPane();
	$("#deck-area-scroll").jScrollPane();
	screenSize();
	$("#card-pool-scroll").jScrollPane();
	$("#deck-area-scroll").jScrollPane();
	screenSize();
}

function resizeScreen() {
	destroyScroll('#card-pool-scroll');
	destroyScroll('#deck-area-scroll');
	initScreen();
}

$(document).ready(function(){
	cardSizeInit();
	$("#card-pool-scroll").jScrollPane();
	$("#deck-area-scroll").jScrollPane();
});

$(window).resize(function() {
	resizeScreen();
});

