
function showSealedInterface(data){
        
	// untoggle visibility of the lobby interface
  	$("#foyer").css( "display", "none" );
		  
	// toggle visibility of the draft interface
	$('#draft-builder').css( "display", "block" );
        
}
    
function adjustCardCounterUI( magnitude, type ){
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
    
function addCardToUI( element, id, img, row, col, ui ){
        
    var data = { 'id' : id, 'row' : row, 'col' : col };
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
    
function createNewMainRow( rowIdx ){
        
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
    var img = GTC.card_data[ id ].img;
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
	
	var halfScreenHeight = ((windowHeight-headerHeight)/2)-16;//-16 for half of the 32px tall #control-bar
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

