var cardSizeInit = function() {
    
	/*var cardHeight = 198.7; //standard height
	var cardWidth = 143; //standard width*/
	
	$(".card").css( {
		"height" : SealedViewModel.cardH,
		"width" : SealedViewModel.cardW,
		"background-size" : SealedViewModel.cardW + "px " + SealedViewModel.cardH + "px"
	} );
        
};

var SealedViewModel = function( set ) {
	
	this.cardH = 198.7;
	this.cardW = 143;
	this.cardPadding = 3;
	this.cardMarginTop = (this.cardH * 0.894) * -1;
	
	this.poolVerticalPadding = 3 * 2; // top and bottom
	
	this.yOffsetBool = false;
	this.yOffsetDragStart = 0;
	this.yOffset = 0;
	this.yOffsetOld = 0;
    
    this.set = set;
    this.imgSrc = ko.observable( '/static/img/cardback.jpg' );
    this.sideboard = ko.observableArray( [] );
    this.mainboard = ko.observableArray( [] );
    this.mainboardSize = ko.observable( 0 );
    
    this.mouseController = new MouseController();
    this.landController = new LandController();
    this.addLandController = new AddLandController();
    this.poolSortController = new PoolSortController();
    this.poolClearController = new PoolClearController();
    this.deckStatCounterController = new DeckStatCounterController();
    
    this.numMainboardCreatures = ko.observable( 0 );
    this.numMainboardLands = ko.observable( 0 );
    
    this.whiteLandCount = ko.observable( 0 );
    this.blueLandCount = ko.observable( 0 );
    this.blackLandCount = ko.observable( 0 );
    this.redLandCount = ko.observable( 0 );
    this.greenLandCount = ko.observable( 0 );
    
    this.mousedown = false;
    this.cardDragCardCursorTop = '';
    this.cardDragCardCursorLeft = '';
    this.cardDragCardTop = '';
    this.cardDragCardLeft = '';
    this.cardDragCardView = '';
    this.dragDropOrigPool = '';
    this.dragDropOrigColIdx = '';
    this.dragDropNewCol = '';
    this.cardDragSrc = '';

    
    this.sortOption = function( sortType, optionsText ) {
        this.sortType = sortType;
        this.optionsText = optionsText;
    };
    
    this.sortOptions = ko.observableArray( [
        new this.sortOption( 'cmc', 'by cost' )
        , new this.sortOption( 'color', 'by color' )
        , new this.sortOption( 'rarity', 'by rarity' )
        , new this.sortOption( 'type', 'by type' )
    ] );
    
    this.selectedSortOption = this.sortOptions()[0];
    this.cardselect = null;
    
    
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
    
    this.fixPoolSize = function() {
        
        // get number of columns and max column length (or # rows) in sideboard
        var sideboardNumCols = this.sideboard()[0].columns().length;
        var sideboardNumRows = 0;
        for( var i = 0; i < sideboardNumCols; ++i ) {
            var columnLen = this.sideboard()[0].columns()[i].cards().length;
            if( sideboardNumRows < columnLen ) {
                sideboardNumRows = columnLen;
            }
        }
        
        var mainboardNumCols = this.mainboard()[0].columns().length;
        var mainboardNumRows = 0;
        for( var i = 0; i < mainboardNumCols; ++i ) {
            var columnLen = this.mainboard()[0].columns()[i].cards().length;
            if( mainboardNumRows < columnLen ) {
                mainboardNumRows = columnLen;
            }
        }        
				
		//Get current card size
		var cardW = ViewModel.cardW;
		var cardH = ViewModel.cardH;
		var cardPadding = ViewModel.cardPadding;
		var poolVerticalPadding = ViewModel.poolVerticalPadding;
		var cardMarginTop = ViewModel.cardMarginTop;
		
		var cardPoolW = ( cardW + cardPadding ) * (sideboardNumCols);
		var cardPoolH = ( sideboardNumRows * cardH ) + (( (sideboardNumRows - 1) * cardMarginTop ) + poolVerticalPadding);
		
		$("#card-pool-inner").css( {
			width : cardPoolW
			, height : cardPoolH
		} );
		
		cardPoolW = ( cardW + cardPadding ) * ( mainboardNumCols);
		cardPoolH = ( mainboardNumRows * cardH ) + ( ( mainboardNumRows - 1 ) * cardMarginTop ) + poolVerticalPadding;
		
		$("#deck-area-inner").css( {
			width : cardPoolW
			, height : cardPoolH
		} );
				
    };
        
    
};



ko.utils.extend( SealedViewModel.prototype, {
    
    init: function( element, valueAccessor, allBindingsAccessor ) {
        
        var self = this;
        
        jQuery(document).ready( function ($) {
            BackgroundController.setBackgroundImage();
            headerInit();
            $("#header").css('display','block');
            
            limitedInit();
            cardSizeInit();
            headerInit();
            
        	$("#add-land-dropdown").on("click", function(e){
        	  e.stopPropagation();
        	});
            
            ViewModel.mouseController.init();
				
    		self.fixPoolSize();
            
            $("#template-plugin").css("display", "block");
            
        }, self );
        
    }
    
} );