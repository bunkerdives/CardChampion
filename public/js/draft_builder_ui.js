function screenSize() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	if($('#open').is(":visible")){
		var headerHeight = 50;
	} else {
		var headerHeight = 20;
	}
	
	
	
	var halfScreenHeight = ((windowHeight-headerHeight)/2)-20;//-50 is from header height; -20 for half of the 40px tall control-bar
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
	var cardPoolWidth = (windowWidth-10)-previewWidth;//5 for left margin on #img-preview, 5 for left margin and 5 for right margin on #card-pool
	$('#card-pool').css({
		"height" : cardPoolHeight,
		"width" : cardPoolWidth
	});
	$('#card-pool-scroll').css("height", cardPoolHeight);

	
	var deckAreaHeight = halfScreenHeight;
	var deckAreaWidth = windowWidth;
	$('#deck-area').css({
		"height" : deckAreaHeight,
		"width" : deckAreaWidth
	});
}

function destroyScroll(id){
	var element = $(id).jScrollPane();
	var api = element.data('jsp');
	api.destroy();
}

function initScreen() {
	$("#card-pool-scroll").jScrollPane();
	$("#deck-area").jScrollPane();
	screenSize();
	$("#card-pool-scroll").jScrollPane();
	$("#deck-area").jScrollPane();
	screenSize();
}

function resizeScreen() {
	destroyScroll('#card-pool-scroll');
	destroyScroll('#deck-area');
	initScreen();
}

$(document).ready(function(){
	initScreen();
});

$(window).resize(function() {
	resizeScreen();
});

