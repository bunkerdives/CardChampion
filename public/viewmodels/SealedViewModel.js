var cardSizeInit = function() {
    
    	var cardHeight = 198.7; //standard height
    	var cardWidth = 143; //standard width
	
    	$(".card").css( {
    		"height" : cardHeight,
    		"width" : cardWidth,
    		"background-size" : cardWidth + "px " + cardHeight + "px"
    	} );
        
};

var SealedViewModel = function( set ) {
    
    this.set = set;
    this.imgSrc = ko.observable( 'img/cardback.jpg' );
    this.sideboard = ko.observableArray( [] );
    this.mainboard = ko.observableArray( [] );
    this.mainboardSize = ko.observable( 0 );
    
    this.numMainboardCreatures = ko.observable( 0 );
    this.numMainboardLands = ko.observable( 0 );
    
    this.whiteLandCount = ko.observable( 0 );
    this.blueLandCount = ko.observable( 0 );
    this.blackLandCount = ko.observable( 0 );
    this.redLandCount = ko.observable( 0 );
    this.greenLandCount = ko.observable( 0 );
    
    this.addLandToMainboard = function( landData ) {
        ;
    };
    
    this.adjustCardCounterUI = function( card, magnitude ) {
        
        var count = ( this.mainboardSize() + magnitude );
        if( count >= 0 ) {
            this.mainboardSize( count );
        }
        
        var type = card.type;
        if( ( /Creature/g ).test( type ) ){
            this.numMainboardCreatures( this.numMainboardCreatures() + magnitude );
        }
        else if( ( /Land/g ).test( type ) ){
            this.numMainboardLands( this.numMainboardLands() + magnitude );
        }
    
    };
    
    this.incrLandCount = function( color ) {
        switch( color ) {
            case 'W' :
                this.whiteLandCount( this.whiteLandCount() + 1 );
                break;
            case 'U' :
                this.blueLandCount( this.blueLandCount() + 1 );
                break;
            case 'B' :
                this.blackLandCount( this.blackLandCount() + 1 );
                break;
            case 'R' :
                this.redLandCount( this.reLandCount() + 1 );
                break;
            case 'G' :
                this.greenLandCount( this.greenLandCount() + 1 );
                break;
            default :
                break;
        }
        return;
    };
    
    this.decrLandCount = function( color ) {
        switch( color ) {
            case 'W' :
                var landCount = this.whiteLandCount();
                if( landCount > 0 ) {
                    this.whiteLandCount( landCount - 1 );
                }
                break;
            case 'U' :
                var landCount = this.blueLandCount();
                if( landCount > 0 ) {
                    this.blueLandCount( landCount - 1 );
                }
                break;
            case 'B' :
                var landCount = this.blackLandCount();
                if( landCount > 0 ) {
                    this.blackLandCount( landCount - 1 );
                }
                break;
            case 'R' :
                var landCount = this.redLandCount();
                if( landCount > 0 ) {
                    this.redLandCount( landCount - 1 );
                }
                break;
            case 'G' :
                var landCount = this.greenLandCount();
                if( landCount > 0 ) {
                    this.greenLandCount( landCount - 1 );
                }
                break;
            default :
                break;
        }
        return;
    };
    
    this.sortOption = function( sortType, optionsText ) {
        this.sortType = sortType;
        this.optionsText = optionsText;
    };
    
    this.sortOptions = ko.observableArray( [
        new this.sortOption( 'cmc', 'by cost' )
        , new this.sortOption( 'color', 'by color' )
        , new this.sortOption( 'type', 'by type' )
        , new this.sortOption( 'rarity', 'by rarity' )
    ] );
    this.selectedSortOption = ko.observable( this.sortOptions()[0] );
    
    this.cardselect = null;
    
    this.sortPool = function( boardType ) {
        
        var sortType = this.selectedSortOption().sortType;
        
        if( boardType == "sideboard" ) {
            this.sideboard()[0].sortPoolByType( sortType, "name" );
        }
        else if( boardType == "mainboard" ) {
            this.mainboard()[0].sortPoolByType( sortType, "name" );
        }
        
    };
    
    this.newSealedInstance = function() {
        
        // generate a sealed card pool, given to us as an array of CardViewModels
        var cards = this.newSealedPool();
        
        // create sideboard CardPoolViewModel and add the generated card pool to it
        var sideboard = new CardPoolViewModel( 'sideboard' );
        sideboard.newCardPoolInstance( cards );
        this.sideboard( [ sideboard ] );
        
        // create mainboard CardPoolViewModel
        var mainboard = new CardPoolViewModel( 'mainboard' );
        mainboard.newCardPoolInstance( '' );
        this.mainboard( [ mainboard ] );
        
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
	    //$("#open").removeClass("foyer-header");
			
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
        limitedInit();
        cardSizeInit();
    }
} );