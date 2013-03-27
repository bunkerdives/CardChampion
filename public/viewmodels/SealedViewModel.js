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
        
        var colSortType = ViewModel.selectedSortOption.sortType;
        
        // create number of lands per each type, according to the land counts
        for( var i = 0; i < this.whiteLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('W') );
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < this.blueLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('U') );
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < this.blackLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('B') );
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < this.redLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('R') );
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < this.greenLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('G') );
            this.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            this.adjustCardCounterUI( landCard, 1);
        }
        
        this.resetLandCounters();
        this.closeLandDropdown();
        
    };
    
    this.resetLandCounters = function() {
        this.whiteLandCount(0);
        this.blueLandCount(0);
        this.blackLandCount(0);
        this.redLandCount(0);
        this.greenLandCount(0);
    };
    
    this.closeLandDropdown = function() {
        $("body").trigger('click');
    };
    
    this.suggestLand = function() {
        
    };
    
    this.adjustCardCounterUI = function( card, magnitude ) {
        
        var count = ( this.mainboardSize() + magnitude );
        if( count >= 0 ) {
            this.mainboardSize( count );
        }
        
        if( ( /Creature/g ).test( card.type ) ){
            this.numMainboardCreatures( this.numMainboardCreatures() + magnitude );
        } else if( ( /Land/g ).test( card.type ) ){
            this.numMainboardLands( this.numMainboardLands() + magnitude );
        }
    
    };
    
    this.incrLandCount = function( color ) {
        switch( color ) {
            case 'W' :
                this.whiteLandCount( this.whiteLandCount() + 1 );
                return;
            case 'U' :
                this.blueLandCount( this.blueLandCount() + 1 );
                return;
            case 'B' :
                this.blackLandCount( this.blackLandCount() + 1 );
                return;
            case 'R' :
                this.redLandCount( this.redLandCount() + 1 );
                return;
            case 'G' :
                this.greenLandCount( this.greenLandCount() + 1 );
                return;
        }
    };
    
    this.decrLandCount = function( color ) {
        switch( color ) {
            case 'W' :
                if( this.whiteLandCount() > 0 ) {
                    this.whiteLandCount( landCount - 1 );
                }
                return;
            case 'U' :
                if( this.blueLandCount() > 0 ) {
                    this.blueLandCount( landCount - 1 );
                }
                return;
            case 'B' :
                if( this.blackLandCount() > 0 ) {
                    this.blackLandCount( landCount - 1 );
                }
                return;
            case 'R' :
                if( this.redLandCount() > 0 ) {
                    this.redLandCount( landCount - 1 );
                }
                return;
            case 'G' :
                if( this.greenLandCount() > 0 ) {
                    this.greenLandCount( landCount - 1 );
                }
                return;
        }
    };
    
    this.sortPool = function( boardType ) {
        
        var sortType = this.selectedSortOption.sortType;
        
        if( boardType == "sideboard" ) {
            this.sideboard()[0].sortPoolByType( sortType, "name" );
        } else if( boardType == "mainboard" ) {
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
			
	    this.mainboardSize( 0 );
	    this.numMainboardCreatures( 0 );
	    this.numMainboardLands( 0 );
		
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
            
            for( var j = numCards - 1; j >= 0; --j ) {
                var cardView = column.cards()[j];
                cards.remove( cardView );
                sideboard.addCardToPool( cardView, sortType, 'name' );
            }
            
        }
        
    };
    
    this.clearMainboardLands = function() {
		
		this.mainboardSize( this.mainboardSize() - this.numMainboardLands() );
		this.numMainboardLands( 0 );
        
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
            
            for( var j = numCards - 1; j >= 0; --j ) {
                
                var cardView = column.cards()[j];
                
                if( (/Land/g).test( cardView.type ) ) {
                    cards.remove( cardView );
                }
                
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
        
            // attach the mousemove event handler to the document element
            $(document).mousemove( ViewModel.mouseMoveCardDrag );
            $(document).mouseup( ViewModel.mouseUp );
				
    		self.fixPoolSize();
            
            $("#template-plugin").css("display", "block");
            
        }, self );
        
    }
    
} );