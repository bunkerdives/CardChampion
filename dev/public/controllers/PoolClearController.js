var PoolClearController = function() {
    
    this.clearMainboard = function() {
			
	    ViewModel.mainboardSize( 0 );
	    ViewModel.numMainboardCreatures( 0 );
	    ViewModel.numMainboardLands( 0 );
		
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
		
		ViewModel.mainboardSize( ViewModel.mainboardSize() - ViewModel.numMainboardLands() );
		ViewModel.numMainboardLands( 0 );
        
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
    
};