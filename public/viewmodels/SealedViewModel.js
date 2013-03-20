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
    
    //this.selectedSortOption = ko.observable( this.sortOptions()[0] );
    this.selectedSortOption = this.sortOptions()[0];
    
    this.cardselect = null;
    
    this.selectSortOption = function( type ) {
    
        switch( type ) {
            case 'cmc' :
                this.selectedSortOption = this.sortOptions()[0];
                $("#aSortDisplay").html('by cost');
                return;
            case 'color' :
                this.selectedSortOption = this.sortOptions()[1];
                $("#aSortDisplay").html('by color');
                return;
            case 'rarity' :
                this.selectedSortOption = this.sortOptions()[2];
                $("#aSortDisplay").html('by rarity');
                return;
        }
    
    }
    
    , this.addLandToMainboard = function() {
        
        var colSortType = ViewModel.selectedSortOption().sortType;
        
        // create number of lands per each type, according to the land counts
        for( var i = 0; i < this.whiteLandCount(); ++i ){
            
            var land = new Land('W');
            var landCard = new CardViewModel(land);
            
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
            
        }
        
        for( var i = 0; i < this.blueLandCount(); ++i ){
            
            var land = new Land('U');
            var landCard = new CardViewModel(land);
            
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
            
        }
        
        for( var i = 0; i < this.blackLandCount(); ++i ){
            
            var land = new Land('B');
            var landCard = new CardViewModel(land);
            
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
            
        }
        
        for( var i = 0; i < this.redLandCount(); ++i ){
            
            var land = new Land('R');
            var landCard = new CardViewModel(land);
            
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
            
        }
        
        for( var i = 0; i < this.greenLandCount(); ++i ){
            
            var land = new Land('G');
            var landCard = new CardViewModel(land);
            
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
            
        }
        
    };
    
    this.suggestLand = function() {
        
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
                this.redLandCount( this.redLandCount() + 1 );
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
    
    this.sortPool = function( boardType ) {
        
        var sortType = this.selectedSortOption.sortType;
        
        console.log("sortPool sortType = " + sortType );
        
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
    
    this.clearMainboard = function() {
      
        console.log("clearMainboard");
        
        var mainboard = ViewModel.mainboard()[0];
        var sideboard = ViewModel.sideboard()[0];
        var sortType = ViewModel.selectedSortOption.sortType;
        
        // move each card from the mainboard to the sideboard
        var columns = mainboard.columns();
        var numColumns = columns.length;
        
        for( var i = 0; i < numColumns; ++i ) {
            
            var column = columns[i];
            var cards = column.cards;
            var numCards = column.cards().length;
            
            for( var j = 0; j < numCards; ++j ) {
                
                var cardView = column.cards()[j];
                
                cards.remove( cardView );
                
                sideboard.addCardToPool( cardView, sortType, 'name' );
                
            }
            
        }
        
    };
    
    this.mouseMoveCardDrag = function( event ) {
        
        if( ViewModel.mousedown == true ){
            
            var pool = ViewModel.dragDropOrigPool;
            pool.removeCardFromPool( ViewModel.cardDragCardView, ViewModel.dragDropOrigColIdx );
            
            var ele = $("#drag-drop-card");
            ele.css( 'background-image', 'url(' + ViewModel.cardDragSrc + ')' );
            ele.css( 'display', 'block' );
            ele.css( 'background-size', ViewModel.cardW + "px " + ViewModel.cardH + "px" );
            ele.css( 'height', ViewModel.cardH );
            ele.css( 'width', ViewModel.cardW );
            
            /*
            ele.css( {
                'top' : ViewModel.cardDragCardTop + (event.pageY - ViewModel.cardDragCardCursorTop)
                , 'left' : ViewModel.cardDragCardLeft + (event.pageX - ViewModel.cardDragCardCursorLeft)
            } );
            */
            
            ele.css( {
                'top' : event.pageY
                , 'left' : event.pageX
            } );
            
        
        }
    };
    
    this.mouseUp = function( event ) {
      
        if( ViewModel.mousedown == true ) {
            
            // hide the drag drop card
            $("#drag-drop-card").css( 'display', 'none' );
            
            ViewModel.mousedown = false;
            
            if( ViewModel.dragDropNewCol != '' ){
                ViewModel.dragDropNewCol.cards.push( ViewModel.cardDragCardView );
                ViewModel.dragDropNewCol = '';
            }
            else{
                // add the card back to the column it belongs in
                var col = ViewModel.dragDropOrigColIdx;
                ViewModel.dragDropOrigPool.columns()[col].cards.push( ViewModel.cardDragCardView );
            }
            
        }
        
    };
    
};



ko.utils.extend( SealedViewModel.prototype, {
    init: function( element, valueAccessor, allBindingsAccessor ) {
        limitedInit();
        cardSizeInit();
        console.log("SealedViewModel init")
        headerInit();
        headerInit();
        
    	$("#add-land-dropdown").on("click", function(e){
    		//do something
    	  e.stopPropagation();
    	});
        
        // attach the mousemove event handler to the document element
        $(document).mousemove( ViewModel.mouseMoveCardDrag );
        $(document).mouseup( ViewModel.mouseUp );
        
    }
    
} );