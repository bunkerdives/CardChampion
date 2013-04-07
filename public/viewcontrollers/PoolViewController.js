var PoolViewController = function() {
    
    this.fixPoolSize = function() {
        
        // get number of columns and max column length (or # rows) in sideboard
        var sideboardNumCols = ViewModel.sideboard()[0].columns().length;
        var sideboardNumRows = 0;
        for( var i = 0; i < sideboardNumCols; ++i ) {
            var columnLen = ViewModel.sideboard()[0].columns()[i].cards().length;
            if( sideboardNumRows < columnLen ) {
                sideboardNumRows = columnLen;
            }
        }
        
        var mainboardNumCols = ViewModel.mainboard()[0].columns().length;
        var mainboardNumRows = 0;
        for( var i = 0; i < mainboardNumCols; ++i ) {
            var columnLen = ViewModel.mainboard()[0].columns()[i].cards().length;
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
