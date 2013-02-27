var CardViewModel = function( cardData ) {
    
    this.self = this;
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
    }, this);
    
    this.cardZoom = function( view ) {
        
        var url = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
                + this.multiverse
                + '&type=card';
        
        view.imgSrc( url );
        
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
        
        var sideboard = ViewModel.sideboard()[0];
        var mainboard = ViewModel.mainboard()[0];
        
        var colSortType = ViewModel.selectedSortOption().sortType;
        
        if( poolType == 'sideboard' ) {
            var col = this.cardColumn( sideboard, this );
            sideboard.removeCardFromPool( this, col );
            mainboard.addCardToPool( this, colSortType, "name" );
        }
        else if( poolType == 'mainboard' ) {
            var col = this.cardColumn( mainboard, this );
            mainboard.removeCardFromPool( this, col );
            sideboard.addCardToPool( this, colSortType, "name" );
        }
        
    };
    
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