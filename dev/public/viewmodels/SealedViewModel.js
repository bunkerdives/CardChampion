var SealedViewModel = function( set ) {
	
	this.viewName = 'Sealed';
	
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
    this.stopCardMouseUp = false;
    
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
    
    
    this.newSealedInstance = function( boosters ) {
		
		var cardPool = [];
		
		// if the server passed sealed data, load it up!
		if( boosters == undefined || boosters == null ) {
			// TODO display an error to the user and 'exit' gracefully
			console.log("Error getting boosters")
		}
		
		for( var i = 0; i < boosters.length; ++i ) {
			cardData = boosters[i];
	
			var obj = {
				name : cardData.name
				, rarity : cardData.rarity
				, color : cardData.color
				, cmc : cardData.cmc
				, multiverse : cardData.multiverse
				, type : cardData.type
				, pt : cardData.pt
			}
			
			//console.log(obj)
			cardPool[i] = new CardViewModel( obj );
		}
		
        // create sideboard CardPoolViewModel and add the generated card pool to it
        var sideboard = new CardPoolViewModel( 'sideboard' );
        sideboard.newCardPoolInstance( cardPool );
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
        
        jQuery(document).ready( function ($) {
            
            BackgroundController.setBackgroundImage();
            HeaderViewController.headerLayout();
            $("#header").css('display','block');
            
            LimitedViewController.limitedInit();
            CardViewController.cardSizeInit();
            
        	$("#add-land-dropdown").on( "click", function(e) {
        	  e.stopPropagation();
        	} );
            
            ViewModel.mouseController.init();
				
    		ViewModel.poolViewController.fixPoolSize();
            
            $("#template-plugin").css("display", "block");
			
			$("#add-land-dropdown").on("click", function(e){
			  e.stopPropagation();
			});
            
        } );
        
    }
    
} );