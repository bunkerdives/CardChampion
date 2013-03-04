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
		
		this.yOffsetBool = false;
		this.yOffsetDragStart = 0;
    
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



ko.utils.extend( SealedViewModel.prototype, {
    init: function() {
        limitedInit();
        cardSizeInit();
    }
} );