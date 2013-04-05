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
    
    this.mainboardSize = ko.observable( 0 );
    
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
		//magnitude = parseInt( magnitude );
		console.log(magnitude)
		if ( magnitude < 0) {//If decrement
			console.log('main decrement')
			if (this.mainMagnitude() > 0) {
				
				this.mainMagnitude( this.mainMagnitude() - 1);
			} 
		} else {
			this.mainMagnitude( this.mainMagnitude() + 1);
		}
		
    };
	
    this.setSideMagnitude = function( magnitude ) {
        
		if ( magnitude < 0) {//If decrement
			if (this.sideMagnitude() > 0) {
				this.sideMagnitude( this.sideMagnitude() - 1);
			} 
		} else {
			this.sideMagnitude( this.sideMagnitude() + 1);
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



ko.utils.extend( BuilderViewModel.prototype, {
    
    init: function( element, valueAccessor, allBindingsAccessor ) {
        
        ViewModel.initBuilderView();
		
		BackgroundController.setBackgroundImage();
        
        builderLayout();
        
    }
    
} );