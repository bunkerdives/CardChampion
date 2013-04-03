var BuilderViewModel = function() {
    
    this.mainboard = ko.observableArray( [] );
    this.sideboard = ko.observableArray( [] );
    
    this.chosenMagn = ko.observable();
    
    this.typeaheadController = TypeaheadController;
    
    this.imgSrc = ko.observable( '/static/img/cardback.jpg' );
    
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
    this.setChosenCardMagnitude = function( magnitude ) {
        this.chosenMagn( magnitude );
    };
    
    // addChosenCardToMainboard - add the chosen card to the mainboard
    this.addChosenCardToMainboard = function() {
        if( this.typeaheadController.chosenCard != '' ) {
            this.mainboard()[0].addCardToPool( this.typeaheadController.chosenCard, "cmc", "name" );
        }
    };
    
    // addChosenCardToSideboard() - add the chosen card to the sideboard
    this.addChosenCardToSideboard = function() {
        if( this.typeaheadController.chosenCard != '' ) {
            this.sideboard()[0].addCardToPool( this.typeaheadController.chosenCard, "cmc", "name" );
        }
    };
    
};



ko.utils.extend( BuilderViewModel.prototype, {
    
    init: function( element, valueAccessor, allBindingsAccessor ) {
        
        ViewModel.initBuilderView();
        
        builderLayout();
        
    }
    
} );