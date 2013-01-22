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
	
	var halfScreenHeight = ((windowHeight-headerHeight)/2)-20;//-20 for half of the 40px tall #control-bar
	var halfScreenWidth = windowWidth;	
	$('#top-screen').css({
		"height" : halfScreenHeight,
		"width" : halfScreenWidth 
	});
	$('#bottom-screen').css({
		"height" : halfScreenHeight,
		"width" : halfScreenWidth
	});
	
	var previewHeight = halfScreenHeight-10;//5 for bottom and 5 for top margin on #img-preview
	var previewWidth = (previewHeight*0.71935483870968);//Determine width via card ratio
	$('#img-preview').css({
		"height" : previewHeight,
		"width" : previewWidth,
		"background-size" : previewWidth + "px " + previewHeight + "px"
	});
	
	var cardPoolHeight = halfScreenHeight;
	var cardPoolWidth = (windowWidth-10)-previewWidth;//5 for left margin on #img-preview, 5 for margin between #img-preview and #card-pool
	$('#card-pool').css({
		"height" : cardPoolHeight,
		"width" : cardPoolWidth
	});
	$('#card-pool-scroll').css("height", cardPoolHeight);
	$('#card-pool-inner').css("min-width", cardPoolWidth - 3);

	
	
	var deckAreaHeight = halfScreenHeight - 3;
	var deckAreaWidth = windowWidth - 3;
	$('#deck-area').css({
		"height" : deckAreaHeight,
		"width" : deckAreaWidth
	});
	$('#deck-area-scroll').css("height", deckAreaHeight);
	$('#deck-area-inner').css("min-width", deckAreaWidth);
}

function cardSizeInit(){
	var cardHeight = 198.7;//standard height
	var cardWidth = 143;//standard width
	
	var cardPoolInnerHeight = (cardHeight * 2) + 3;//Add detect row
	var cardPoolInnerWidth = (cardWidth * 8) + (3 * 8);//add detect columns
	
	$("#card-pool-inner").css({
		"height" : cardPoolInnerHeight,
		"width" : cardPoolInnerWidth,
	});	
	
	$("#deck-area-inner").css({
		"height" : cardPoolInnerHeight,
		"width" : cardPoolInnerWidth,
	});	
	
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
	initScreen();
});

$(window).resize(function() {
	resizeScreen();
});

