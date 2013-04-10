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
	this.topScreenCalcPercentage = 60;
	this.topScreenCalcPercentageOld = 60;
    
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
    
    this.poolViewController = new PoolViewController();
    
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
    
    
};



ko.utils.extend( SealedViewModel.prototype, {
    
    init: function( element, valueAccessor, allBindingsAccessor ) {
        
        var self = this;
        
        jQuery(document).ready( function ($) {
            BackgroundController.setBackgroundImage();
            headerInit();
            $("#header").css('display','block');
            
            limitedInit();
            CardViewController.cardSizeInit();
            headerInit();
            
        	$("#add-land-dropdown").on("click", function(e){
        	  e.stopPropagation();
        	});
            
            ViewModel.mouseController.init();
				
    		ViewModel.poolViewController.fixPoolSize();
            
            $("#template-plugin").css("display", "block");
            
        }, self );
        
    }
    
} );