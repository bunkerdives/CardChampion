var SealedViewModel = function( set ) {
    
    this.set = set;
    this.sideboard = ko.observableArray( [] );
    this.mainboard = ko.observableArray( [] );
    
    this.newSealedInstance = function() {
        
        console.log("newSealedInstance");
        console.log(this.set);
        
        // generate a sealed card pool, given to us as an array of CardViewModels
        var cards = this.newSealedPool();
        console.log( cards );
        
        // create sideboard CardPoolViewModel and add the generated card pool to it
        var sideboard = new CardPoolViewModel();
        sideboard.newCardPoolInstance( cards );
        console.log("sideboard:");
        console.log(sideboard);
        this.sideboard( [ sideboard ] );
        
        // create mainboard CardPoolViewModel
        var mainboard = new CardPoolViewModel();
        mainboard.newCardPoolInstance( [] );
        this.mainboard( [ mainboard ] );
        
        console.log( this.sideboard );
        
    };
    
    this.addCardToMainboard = function() {
        
    };
    
    this.addCardToSideboard = function() {
        
    };
    
    this.newSealedPool = function() {
        
        var boosters = [];
        
        for( var i = 0; i < 6; ++i ){
            var booster = BoosterPack.newBooster( this.set );
            $.merge( boosters, booster );
        }
        
        return boosters;
        
    };
    
};

var screenSize = function() {
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
    	var cardPoolWidth = (windowWidth-10)-previewWidth-25;//5 for left margin on #img-preview, 5 for margin between #img-preview and #card-pool
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
	
        /*
    	var cardPoolInnerHeight = ((cardHeight * Sealed.numRows)-(178 * (Sealed.numRows - 1))) + 3;//178 for negative margin-top on each .card, 3 for padding top on #card-pool-row-0/3 for bottom padding
    	var cardPoolInnerWidth = (cardWidth * Sealed.numCols) + (3 * Sealed.numCols);//3 for left padding on each column
        */
    	var cardPoolInnerHeight = 3000;
    	var cardPoolInnerWidth = 3000;
	
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
    
};

ko.utils.extend( SealedViewModel.prototype, {
    init: function( ) {
        console.log("SealedSetList init");
        screenSize();
    }
} );