
function showSealedInterface( data ) {
        
	// untoggle visibility of the lobby interface
  	$("#foyer").css( "display", "none" );
		  
	// toggle visibility of the draft interface
	$('#limited').css( "display", "block" );
        
}
    
function adjustCardCounterUI( magnitude, type ) {
    
    $( "#mainboard-total" ).html( (Sealed.numCardsInDeck) + "/40" );
    
    if( type == "Creature" || type == "Artifact Creature" ){
        Sealed.numCreaturesInDeck += magnitude;
        $("#mainboard-creatures").html( "Creatures: " + (Sealed.numCreaturesInDeck) );
    }
    else if( type == "Land" ){
        Sealed.numLandsInDeck += magnitude;
        $("#mainboard-lands").html( "Lands: " + (Sealed.numLandsInDeck) );
    }
    
}
    
function addCardToUI( element, id, img, row, col, ui, set ) {
    
    var data = { 'id' : id, 'row' : row, 'col' : col, 'set' : set };
    
    element.css( "background-image", 'url(' + img + ')' );
    element.css( "z-index", row );
    element.on( 'mouseover', data, cardZoom );
    element.attr( "data-card-id", id );
    
    switch( ui ){
        case "pool" :
            element.dblclick( data, Sealed.addCardToMain );
            break;
        case "main" :
            element.dblclick( data, Sealed.addCardToPoolCallback );
            break;
    }
        
    limitedLayout();
        
}
    
function removeCardFromUI( element ) {
    element.attr( "data-card-id", "" );
    element.css( "background-image", "none" );
    element.css( "z-index", "-1" );
    element.off( 'dblclick' );
    element.off( 'mouseover' );
}
    
function createNewPoolRow( rowIdx ) {
        
    var row = $('<div>').attr("id", "card-pool-row-" + rowIdx);
    row.addClass("card-pool-row");
    $("#card-pool-inner").append(row);
            
    for( var i = 0; i < 7; ++i ){
        var img = $("<div>");
        img.addClass( "card" ).addClass("stack");
        img.attr("id", "card-pool-" + rowIdx + "-" + i );
        img.css("z-index", "-1");
        $(row).append( img );
    }
        
}
    
function createNewMainRow( rowIdx ) {
        
    var row = $('<div>').attr("id", "deck-area-row-" + rowIdx);
    row.addClass("card-pool-row");
    $("#deck-area-inner").append(row);
            
    for( var i = 0; i < 7; ++i ){
        var img = $("<div>");
        img.addClass( "card" ).addClass("stack");
        img.attr("id", "deck-area-" + rowIdx + "-" + i );
        img.css("z-index", "-1");
        $(row).append( img );
    }
        
}
    
function cardZoom( event ) {
    var id = event.data.id;
    var set = event.data.set;
    var img = Sealed.newMultiverseURL( set.card_data[ id ].multiverse );
    $("#img-preview").css( "background-image", 'url(' + img + ')' );
}


function limitedLayout() {
	//console.log('limitedLayout function called.');
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	var templateH = windowHeight-30-5;//30=header height, 5=limited template padding-top
	
	var halfScreenHeight = ((templateH)/2)-14;//-14 for half of the 28px tall #control-bar
	
	var halfScreenWidth = windowWidth;
	
	var yOffsetNum = yOffset;
	//console.log("yOffsetNum: " + yOffsetNum);
	var topScreenHeight = (halfScreenHeight + (templateH/9))-yOffsetNum;
	var bottomScreenHeight= (halfScreenHeight - (templateH/9))+yOffsetNum; 	
	
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
		"width" : deckAreaWidth
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
		"min-width": deckAreaWidth - 3,
		"min-height": deckAreaHeight
	});	
}




			//Card size slider

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 500;

function cardSizeChange(slideAmount) {
	//console.log('cardSizeChange function called.')
	
	var standardH = 198.7; //standard card height
	var standardW = 143; //standard card width
	var newH = standardH * (slideAmount/100);
	var newW = standardW * (slideAmount/100);
	var marginTop = (newH * 0.894) * -1;
	SealedViewModel.cardH = newH;
	SealedViewModel.cardW = newW;
	
	$(".card").each(function() {//Change background size of cards to 0; add class .cardResize
		$(this).addClass('cardResize');
		$(this).css({
			'background-size': '0px 0px',
			"height" : newH,
			"width" : newW,
			"margin-top" : marginTop
		});
	});
	
	$(".column").each(function() {
		$(this).css("margin-top", marginTop*-1);
	});
	
	//Set timeout
	rtime = new Date();
  if (timeout === false) {
      timeout = true;
      setTimeout(cardSizeChangeEnd, delta);
  }
}

function cardSizeChangeEnd() {
	//console.log('cardSizeChangeEnd function called.')
  if (new Date() - rtime < delta) {
  	setTimeout(cardSizeChangeEnd, delta);
  } else {
  	timeout = false;
		var newW = SealedViewModel.cardW;
		var newH = SealedViewModel.cardH;
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

		//Card size slider end

var yOffset = 0;
var yOffsetOld = 0;		

function offsetDragHandlers() {
	$('#drag-offset-y').mousedown(function(e){
		SealedViewModel.yOffsetBool=true;
		$("body").addClass("no-select");
		$("body").addClass("ns-resize-cursor");
		//console.log("yOffsetBool: " + SealedViewModel.yOffsetBool);
		SealedViewModel.yOffsetDragStart=e.pageY;
		//console.log("yOffsetDragStart: " + SealedViewModel.yOffsetDragStart);
	});
	
	$(document).mouseup(function(){
		if (SealedViewModel.yOffsetBool == true) {
			SealedViewModel.yOffsetBool = false;
			$("body").removeClass("no-select");
			$("body").removeClass("ns-resize-cursor");
			yOffsetOld = yOffset;
			//console.log("yOffsetBool: " + SealedViewModel.yOffsetBool);
		}
	}).mousemove(function(e){
		if (SealedViewModel.yOffsetBool == true) {
			var yOffsetStart = SealedViewModel.yOffsetDragStart;
			//console.log('yOffsetStart: ' + yOffsetStart);
			var yOffsetEnd = e.pageY;
			//console.log('yOffsetEnd: ' + yOffsetEnd);
			var yOffsetDelta = yOffsetStart - yOffsetEnd;
			//console.log('yOffsetDelta: ' + yOffsetDelta);
			yOffset = yOffsetOld + yOffsetDelta;
			limitedLayout();
		}
	});
}

function limitedInit() {
	limitedLayout();
	offsetDragHandlers();
}

$(document).ready(function(){
	cardSizeInit();
	$("#add-land-dropdown").on("click", function(e){
		//do something
	  e.stopPropagation();
	});
});

$(window).resize(function() {
	limitedLayout();
});
