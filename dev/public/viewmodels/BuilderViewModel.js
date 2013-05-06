var BuilderViewModel = function() {
	
	this.viewName = 'Builder';
    
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
    
    // TODO add a function that loads the cards in a premade deck
    this.deckName;
    this.deckContainer;
    this.deckData;
    
    this.lightboxController = LightboxController;
    this.saveDeckController = SaveDeckController;
    
    this.mouseController = new MouseController();
    this.landController = new LandController();
    this.addLandController = new AddLandController();
    this.poolSortController = new PoolSortController();
    this.poolClearController = new PoolClearController();
    this.deckStatCounterController = new DeckStatCounterController();
    
    this.poolViewController = new PoolViewController();
    
    this.mainboardSize = ko.observable( 0 );
    this.sideboardSize = ko.observable( 0 );
    
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
        
        var main = this.createMainboardFromDeckData( ViewModel.deckData );
        var side = this.createSideboardFromDeckData( ViewModel.deckData );
        
        // create sideboard CardPoolViewModel
        var sideboard = new CardPoolViewModel( 'sideboard' );
        sideboard.newCardPoolInstance( side );
        this.sideboard( [ sideboard ] );
        
        // create mainboard CardPoolViewModel
        var mainboard = new CardPoolViewModel( 'mainboard' );
        mainboard.newCardPoolInstance( main );
        this.mainboard( [ mainboard ] );
        
    };
    
    this.createMainboardFromDeckData = function( deckData ) {
        
        var mainboard = [];
        
        if( deckData == undefined || deckData.creatures == undefined || deckData.instants == undefined || deckData.sorceries == undefined
             || deckData.planeswalkers == undefined || deckData.lands == undefined || deckData.enchantments == undefined || deckData.artifacts == undefined ) {
            return mainboard;
        }
        
        this.addTypeCardToBoard( deckData, 'creatures', mainboard );
        this.addTypeCardToBoard( deckData, 'lands', mainboard );
        this.addTypeCardToBoard( deckData, 'instants', mainboard );
        this.addTypeCardToBoard( deckData, 'sorceries', mainboard );
        this.addTypeCardToBoard( deckData, 'enchantments', mainboard );
        this.addTypeCardToBoard( deckData, 'planeswalkers', mainboard );
        this.addTypeCardToBoard( deckData, 'artifacts', mainboard );
        
        return mainboard;
        
    };
    
    this.createSideboardFromDeckData = function( deckData ) {
        
        var sideboard = [];
        
        // TODO check for undefined sideboard
        if( deckData == undefined || deckData.sideboard == undefined ) {
            return sideboard;
        }
        
        this.addTypeCardToBoard( deckData, 'sideboard', sideboard );
        
        return sideboard;
        
    };
    
    // addTypeCardToBoard - add all cards of a given type (which are partitioned separately in deckData sent from server)
    //                      to a board object (or card pool object)
    this.addTypeCardToBoard = function( deckData, cardType, boardArray ) {
        
        // array of cards for a given type
        var typeArray;
        var mainboard = true;
        
        switch( cardType ) {
            
            case 'creatures' :
                typeArray = deckData.creatures;
                break;
            case 'lands' :
                typeArray = deckData.lands;
                break;
            case 'instants' :
                typeArray = deckData.instants;
                break;
            case 'sorceries' :
                typeArray = deckData.sorceries;
                break;
            case 'enchantments' :
                typeArray = deckData.enchantments;
                break;
            case 'planeswalkers' :
                typeArray = deckData.planeswalkers;
                break;
            case 'artifacts' :
                typeArray = deckData.artifacts;
                break;
            case 'sideboard' :
                typeArray = deckData.sideboard;
                mainboard = false;
                break;
            
        }
        
        typeArray.forEach( function(element, index) {
            for( var i = 0; i < element.total; ++i ) {
                var card = new CardViewModel( element.card );
                boardArray.push( card );
                ViewModel.deckStatCounterController.adjustCardCounterUI( card, 1 );
                
                // update the sideboard counter if the added card is a sideboard card
                if( ! mainboard ) {
                    ViewModel.adjustSideboardCounter( 1 );
                }
            }
        } );
        
    }
    
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
		
		if( TypeaheadController.chosenMultiverse == '' ) {
			// TODO handle this error?
			return;
		}
		
		// get the currently selected (in the typeahead) card's multiverse
		var multiverse = TypeaheadController.chosenMultiverse;
		
		// send request to server for the card data
		var cardDataRequest = $.get(
			'/cardData?multiverse=' + multiverse
			, function(data) {
				if( data.status == 'Success' ) {
					
					var chosenCard = data.cardData;
					console.log("Chosen Card: " + chosenCard)
					
					var numMainBoard = ViewModel.mainMagnitude();
					var numSideBoard = ViewModel.sideMagnitude();
		
					for (var i = 0; i < numMainBoard; i++) {
			            var card = new CardViewModel( chosenCard );
						ViewModel.mainboard()[0].addCardToPool( card, "cmc", "name" );
					}
		
					for (var i = 0; i < numSideBoard; i++) {
			            var card = new CardViewModel( chosenCard );
						ViewModel.sideboard()[0].addCardToPool( card, "cmc", "name" );
					}
        
			        ViewModel.deckStatCounterController.adjustCardCounterUI( card, numMainBoard );
					
				} else {
					// TODO display error to user
					console.log("Error retrieving card data from server!");
				}
			}
		);
		
		cardDataRequest.error( function( jqxhr, status, error ) {
            // TODO display error to user
			console.log("Error retrieving card data from server!");
		} );
        
	};
	
	this.updatePreviewImage = function (multiverseID) {
		this.imgSrc("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + multiverseID + "&type=card");
	};
	
	this.updateThumbImage = function (multiverseID) {
		this.thumbSrc("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + multiverseID + "&type=card");
	};
	
	this.showThumbAsPreview = function () {
		this.imgSrc( this.thumbSrc() );
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