var BuilderViewModel = function() {
    
    this.mainboard = ko.observableArray( [] );
    this.sideboard = ko.observableArray( [] );
    
    //this.chosenMagnitude = ko.observable();
	this.mainMagnitude = ko.observable( 4 );
	this.sideMagnitude = ko.observable( 0 );
    
    this.typeaheadController = TypeaheadController;
    
    this.imgSrc = ko.observable( '/static/img/cardback.jpg' );
	this.thumbSrc = ko.observable( '/static/img/cardback.jpg' );
    
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
			ViewModel.mainboard()[0].addCardToPool( TypeaheadController.chosenCard, "cmc", "name" );
		}
		
		for (var i = 0; i < numSideBoard; i++) {
			this.sideboard()[0].addCardToPool( this.typeaheadController.chosenCard, "cmc", "name" );
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
		$('#builder-input').val('').change();
	};
    
};



ko.utils.extend( BuilderViewModel.prototype, {
    
    init: function( element, valueAccessor, allBindingsAccessor ) {
        
        ViewModel.initBuilderView();
		
		BackgroundController.setBackgroundImage();
        
        builderLayout();
        
    }
    
} );