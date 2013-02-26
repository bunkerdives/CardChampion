var cardSizeInit = function() {
    
    	var cardHeight = 198.7; //standard height
    	var cardWidth = 143; //standard width
	
    	$(".card").css({
    		"height" : cardHeight,
    		"width" : cardWidth,
    		"background-size" : cardWidth + "px " + cardHeight + "px"
    	});

};

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
	    $("#open").removeClass("foyer-header");
			
      var windowHeight = $(window).height();
    	var windowWidth = $(window).width();
	
    	var headerHeight = 30;
    	var halfScreenHeight = ((windowHeight-headerHeight)/2)-14;//-14 for half of the 28px tall #control-bar
    	var halfScreenWidth = windowWidth;
    	var topScreenHeight = (halfScreenHeight + ((windowHeight-headerHeight)/9));
    	var bottomScreenHeight= (halfScreenHeight - ((windowHeight-headerHeight)/9)); 	
    	$('#top-screen').css({
    		"height" : topScreenHeight,
    		"width" : halfScreenWidth 
    	});
    	$('#bottom-screen').css({
    		"height" : bottomScreenHeight,
    		"width" : halfScreenWidth
    	});
	
    	var previewHeight = topScreenHeight;
    	var previewWidth = (previewHeight*0.71935483870968);//Determine width via card ratio
    	$('#preview-wrapper').css({
    		"height" : previewHeight,
    		"width" : previewWidth
    	});
			
			var previewImgHeight = previewHeight-6;
			var previewImgWidth = previewWidth-6;
			$('#img-preview').css({
    		"height" : previewImgHeight,
    		"width" : previewImgWidth,
    		"background-size" : previewImgWidth + "px " + previewImgHeight + "px"
    	});
	
    	var cardPoolHeight = topScreenHeight;
    	var cardPoolWidth = halfScreenWidth-previewWidth-15;//5 for left margin on #img-preview, 5 for margin between #img-preview and #card-pool
    	$('#card-pool').css({
    		"height" : cardPoolHeight,
    		"width" : cardPoolWidth
    	});
    	$('#card-pool-scroll').css("height", cardPoolHeight);

    	var deckAreaHeight = bottomScreenHeight-5;
    	var deckAreaWidth = halfScreenWidth-10;
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
    init: function() {
        console.log("SealedSetList init");
        screenSize();
        cardSizeInit();
    }
} );