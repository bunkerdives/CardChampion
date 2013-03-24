var CardViewModel = function( cardData ) {
    
    this.self = this;
    this.poolType = '';
    this.name = cardData.name;
    this.rarity = cardData.rarity;
    this.type = cardData.type;
    this.color = cardData.color;
    this.cost = cardData.cost;
    this.cmc = cardData.cmc;
    this.pt = cardData.pt;
    this.multiverse = cardData.multiverse;
    
    this.imgSrc = ko.computed( function() {
        return 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
            + this.multiverse
            + '&type=card';
    }, this );
    
    this.mouseDownHandler = function( poolType, event ) {
        
        //console.log("mouseDownHandler " + poolType);
        
        // save the column view that this card is in
        var pool;
        if( poolType == 'sideboard' ){
            pool = ViewModel.sideboard()[0];
        }
        else if( poolType == 'mainboard' ){
            pool = ViewModel.mainboard()[0];
        }
        else{
            return;
        }
        
        // save the card view object
        ViewModel.cardDragCardView = this;
        
        // remove this card object from its column
        ViewModel.dragDropOrigPool = pool;
        ViewModel.dragDropOrigColIdx = this.cardColumn( pool, this );;
        
        // display the cardDragDrop element at the same spot
        /*
        $("#drag-drop-card").css( {
            'top' : event.pageY
            , 'left' : event.pageX
        } );
        */
        
        ViewModel.cardDragCardCursorTop = event.pageY;
        ViewModel.cardDragCardCursorLeft = event.pageX;
        
        var offset = $(event.target).offset();
        ViewModel.cardDragCardTop = offset.top;
        ViewModel.cardDragCardLeft = offset.left;
        
        ViewModel.mousedown = true;
        ViewModel.cardDragSrc = this.imgSrc();
        
    };
    
    this.mouseUpHandler = function() {
        ViewModel.mousedown = false;
    };
    
    this.cardZoom = function( view ) {
        
        var url = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
                + this.multiverse
                + '&type=card';
        
        ViewModel.imgSrc( url );
				
        var element = $(event.target);
        
        if( ViewModel.cardselect != null ) {
            ViewModel.cardselect.removeClass("select");
        }
        
        element.addClass("select");
        ViewModel.cardselect = element;
				
				
        
    };
    
    this.cardHighlight = function( data, event ) {
			
			
        
        var element = $(event.target);
        
        if( ViewModel.cardselect != null ) {
            ViewModel.cardselect.removeClass("select");
        }
        
        element.addClass("select");
        ViewModel.cardselect = element;
        
    };
    
    this.cardSelect = function( poolType ) {
			
			console.log('cardSelect')
			
			var element = $(event.target);
			var selected = element.hasClass('select');
			if (selected === true) {
				console.log('already highlighted')
        
        var sideboard = ViewModel.sideboard()[0];
        var mainboard = ViewModel.mainboard()[0];
        
        var colSortType = ViewModel.selectedSortOption.sortType;
        
        if( poolType == 'sideboard' ) {
            
            var col = this.cardColumn( sideboard, this );
            
            sideboard.removeCardFromPool( this, col );
            mainboard.addCardToPool( this, colSortType, "name" );
            
            ViewModel.adjustCardCounterUI( this, 1 );
            
        }
        else if( poolType == 'mainboard' ) {
            
            var col = this.cardColumn( mainboard, this );
            
            mainboard.removeCardFromPool( this, col );
            sideboard.addCardToPool( this, colSortType, "name" );
            
            ViewModel.adjustCardCounterUI( this, -1 );
            
        }
        
        ViewModel.fixPoolSize();
				
			}
        
    };
    
    // cardColumn - return what column the card is currently in, if any
    this.cardColumn = function( pool, card ) {
        
        for( var i = 0; i < pool.columns().length; ++i ) {
            
            var column = pool.columns()[i];
            
            var index = column.cards().indexOf( card );
            if( index != -1 ){
                return i;
            }
            
        }
        
        return -1;
        
    }
    
};