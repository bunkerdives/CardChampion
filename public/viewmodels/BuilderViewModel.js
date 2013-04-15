var BuilderViewModel = function() {
    
    this.mainboard = ko.observableArray( [] );
    this.sideboard = ko.observableArray( [] );
    
	this.cardH = 198.7;
	this.cardW = 143;
	this.cardPadding = 3;
	this.cardMarginTop = (this.cardH * 0.894) * -1;
	
	this.poolVerticalPadding = 3 * 2; // top and bottom
	
	this.yOffsetBool = false;
	this.yOffsetDragStart = 0;
	this.yOffset = 0;
	this.yOffsetOld = 0;
    
    this.mainMagnitude = ko.observable( 4 );
	this.sideMagnitude = ko.observable( 0 );
    
    this.typeaheadController = TypeaheadController;
    
    this.imgSrc = ko.observable( '/static/img/cardback.jpg' );
	this.thumbSrc = ko.observable( '/static/img/cardback.jpg' );
    
    this.mouseController = new MouseController();
    this.landController = new LandController();
    this.addLandController = new AddLandController();
    this.poolSortController = new PoolSortController();
    this.poolClearController = new PoolClearController();
    this.deckStatCounterController = new DeckStatCounterController();
    
    this.poolViewController = new PoolViewController();
    
    this.mainboardSize = ko.observable( 0 );
    
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
    
    this.initBuilderView = function() {
        
        this.typeaheadController.initTypeahead();
        
        // create sideboard CardPoolViewModel
        var sideboard = new CardPoolViewModel( 'sideboard' );
        sideboard.newCardPoolInstance( '' );
        this.sideboard( [ sideboard ] );
        
        // create mainboard CardPoolViewModel
        var mainboard = new CardPoolViewModel( 'mainboard' );
        mainboard.newCardPoolInstance( '' );
        this.mainboard( [ mainboard ] );
        
    };
    
    // setChosenCardMagnitude(magnitude) - set the magnitude observable to the specified amount
    this.setMainMagnitude = function( magnitude ) {
		
        if( magnitude < 0 ) {
			if( this.mainMagnitude() > 0 ) {
				this.mainMagnitude( this.mainMagnitude() - 1 );
			} 
		} else {
			this.mainMagnitude( this.mainMagnitude() + 1 );
		}
		
    };
	
    this.setSideMagnitude = function( magnitude ) {
        
		if( magnitude < 0 ) {
			if( this.sideMagnitude() > 0 ) {
				this.sideMagnitude( this.sideMagnitude() - 1 );
			} 
		} else {
			this.sideMagnitude( this.sideMagnitude() + 1 );
		}
		
    };
	
	this.addChosenCardToBoards = function() {
		
		if( ViewModel.typeaheadController.chosenCard == '' ) {
			return;
		}
		
		var numMainBoard = this.mainMagnitude();
		var numSideBoard = this.sideMagnitude();
		
		for (var i = 0; i < numMainBoard; i++) {
            var card = new CardViewModel( TypeaheadController.chosenCard );
			ViewModel.mainboard()[0].addCardToPool( card, "cmc", "name" );
		}
		
		for (var i = 0; i < numSideBoard; i++) {
            var card = new CardViewModel( TypeaheadController.chosenCard );
			this.sideboard()[0].addCardToPool( card, "cmc", "name" );
		}
        
        ViewModel.deckStatCounterController.adjustCardCounterUI( card, numMainBoard );
        
	};
	
	this.updatePreviewImage = function (multiverseID) {
		this.imgSrc("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + multiverseID + "&type=card");
	};
	
	this.updateThumbImage = function (multiverseID) {
		this.thumbSrc("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + multiverseID + "&type=card");
	};
	
	this.showThumbAsPreview = function () {
		this.imgSrc(this.thumbSrc());
	};
	
	this.hideAddCardPrompt = function () {
		$('#builder-add-card-prompt').hide();
		$('#builder-input').val('').change().focus();
	};
    
};



ko.utils.extend( BuilderViewModel.prototype, {
    
    init: function( element, valueAccessor, allBindingsAccessor ) {
        
        ViewModel.initBuilderView();
        
        jQuery(document).ready( function ($) {
            
            BackgroundController.setBackgroundImage();
            headerInit();
            $("#header").css('display','block');
            
            builderLayout();
            CardViewController.cardSizeInit();
            
        	$("#add-land-dropdown").on( "click", function(e){
        	  e.stopPropagation();
        	} );
            
            ViewModel.mouseController.init();
				
    		ViewModel.poolViewController.fixPoolSize();
            
            $("#template-plugin").css("display", "block");
            
        } );
        
    }
    
} );