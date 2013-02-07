
function showSealedInterface( data ) {
        
	// untoggle visibility of the lobby interface
  	$("#foyer").css( "display", "none" );
		  
	// toggle visibility of the draft interface
	$('#draft-builder').css( "display", "block" );
        
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
    
    console.log("Adding " + set.card_data[id].name + " to the card pool! Row " + row + ", Col " + col);
        
    switch( ui ){
        case "pool" :
            element.dblclick( data, Sealed.addCardToMain );
            break;
        case "main" :
            element.dblclick( data, Sealed.addCardToPoolCallback );
            break;
    }
        
    resizeScreen();
        
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
	
	var halfScreenHeight = ((windowHeight-headerHeight)/2)-12;//-12 for half of the 24px tall #control-bar
	var halfScreenWidth = windowWidth;
	var topScreenHeight = (halfScreenHeight + ((windowHeight-headerHeight)/9)) - 2;
	var bottomScreenHeight= (halfScreenHeight - ((windowHeight-headerHeight)/9)); 	
	$('#top-screen').css({
		"height" : topScreenHeight,
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
	
	var cardPoolHeight = topScreenHeight;
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
    
	var cardHeight = 198.7; //standard height
	var cardWidth = 143; //standard width
	
	$(".card").css({
		"height" : cardHeight,
		"width" : cardWidth,
		"background-size" : cardWidth + "px " + cardHeight + "px"
	});

}

/*
			Card size slider
*/

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 300;

function cardSizeChange(slideAmount) {
	var numPoolRows = Sealed.numRows;
	var numPoolCols = Sealed.numCols;
	var numMainRows = Sealed.numMainRows;
	var numMainCols = 7;
	var standardHeight = 198.7; //standard card height
	var standardWidth = 143; //standard card width
	
	//Change background size of cards to 0; add class .cardResize
	//Loop through elements in card pool
  for (var i=1;i<=numPoolRows;i++){
  	for (var j=1;j<=numPoolCols;j++){
			var id="#card-pool-" + (i-1) + "-" + (j-1); //-1's for zero index
			//If there is a card in the element
  		if ($(id).css('z-index') > -1){
				$(id).css('background-size', '0px 0px');
  			$(id).addClass('cardResize');
  		}
  	}
  }
	//Loop through elements in mainboard
  for (var i=1;i<=numMainRows;i++){
  	for (var j=1;j<=numMainCols;j++){
			var id="#deck-area-" + (i-1) + "-" + (j-1); //-1's for zero index
			//If there is a card in the element
  		if ($(id).css('z-index') > -1){
				$(id).css('background-size', '0px 0px');
  			$(id).addClass('cardResize');
  		}
  	}
  }
	
	//Resize inner elements
	var cardHeight = standardHeight * (slideAmount/100);
	var cardWidth = standardWidth * (slideAmount/100);
	var marginTop = (cardHeight * 0.894) * -1;
	var cardPoolInnerHeight = ((cardHeight * numPoolRows)+(marginTop * (numPoolRows - 1.25))) + 3;
	var cardPoolInnerWidth = (cardWidth * numPoolCols) + (3 * numPoolCols);//3 for left padding on each column
	var deckAreaInnerHeight = ((cardHeight * numMainRows)+(marginTop * (numMainRows - 1.25))) + 3;
	var deckAreaInnerWidth = (cardWidth * numMainCols) + (3 * numMainCols);//3 for left padding on each column
	$("#card-pool-inner").css({
		"height" : cardPoolInnerHeight,
		"width" : cardPoolInnerWidth
	});
	$("#deck-area-inner").css({
		"height" : deckAreaInnerHeight,
		"width" : deckAreaInnerWidth
	});		

	
	//Change size of .card elements
	$('.card').css({
		"height" : cardHeight,
		"width" : cardWidth,
	});
	$('.stack').css('margin-top', marginTop);
	
	
	//Set timeout
	rtime = new Date();
  if (timeout === false) {
      timeout = true;
      setTimeout(cardSizeChangeEnd, delta);
  }
}

function cardSizeChangeEnd() {
	var numPoolRows = Sealed.numRows;
	var numPoolCols = Sealed.numCols;
	var numMainRows = Sealed.numMainRows;
	var numMainCols = 7;
  if (new Date() - rtime < delta) {
  	setTimeout(cardSizeChangeEnd, delta);
  } else {
  	timeout = false;
		//get height and width of any .card element
		var cardHeight = $('#card-pool-0-0').height();
		var cardWidth = $('#card-pool-0-0').width();
		var bgSize=cardWidth + "px " + cardHeight + "px";
		//remove .cardResize class, change the background size of these elements
		for (var i=1;i<=numPoolRows;i++){
		 	for (var j=1;j<=numPoolCols;j++){
				var id="#card-pool-" + (i-1) + "-" + (j-1);
		  	if ($(id).css('z-index') > -1){
					$(id).css('background-size', bgSize);
		  		$(id).removeClass('cardResize');
		  	}
		  }
		}
		for (var i=1;i<=numMainRows;i++){
		 	for (var j=1;j<=numMainCols;j++){
				var id="#deck-area-" + (i-1) + "-" + (j-1);
		  	if ($(id).css('z-index') > -1){
					$(id).css('background-size', bgSize);
		  		$(id).removeClass('cardResize');
		  	}
		  }
		}
	}
}
/*
		Card size slider end
*/

function resizeScreen() {
	screenSize();
}

$(document).ready(function(){
	cardSizeInit();
	$("#add-land-dropdown").on("click", function(e){
		//do something
	  e.stopPropagation();
	});
});

$(window).resize(function() {
	resizeScreen();
});
