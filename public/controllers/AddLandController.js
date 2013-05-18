var AddLandController = function() {
    
    this.closeLandDropdown = function() {
        $("body").trigger('click');
    };
    
    this.resetLandCounters = function() {
        ViewModel.whiteLandCount(0);
        ViewModel.blueLandCount(0);
        ViewModel.blackLandCount(0);
        ViewModel.redLandCount(0);
        ViewModel.greenLandCount(0);
    };
    
    this.addLandToMainboard = function() {
        
        var colSortType = ViewModel.selectedSortOption.sortType;
        
        // create number of lands per each type, according to the land counts
        for( var i = 0; i < ViewModel.whiteLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('W') );
            ViewModel.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            ViewModel.deckStatCounterController.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < ViewModel.blueLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('U') );
            ViewModel.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            ViewModel.deckStatCounterController.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < ViewModel.blackLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('B') );
            ViewModel.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            ViewModel.deckStatCounterController.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < ViewModel.redLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('R') );
            ViewModel.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            ViewModel.deckStatCounterController.adjustCardCounterUI( landCard, 1);
        }
        
        for( var i = 0; i < ViewModel.greenLandCount(); ++i ) {
            var landCard = new CardViewModel( new Land('G') );
            ViewModel.mainboard()[0].addCardToPool( landCard, colSortType, "name" );
            ViewModel.deckStatCounterController.adjustCardCounterUI( landCard, 1);
        }
        
        ViewModel.addLandController.resetLandCounters();
        ViewModel.addLandController.closeLandDropdown();
        
    };
    
    this.incrLandCount = function( color ) {
        switch( color ) {
            case 'W' :
                ViewModel.whiteLandCount( ViewModel.whiteLandCount() + 1 );
                return;
            case 'U' :
                ViewModel.blueLandCount( ViewModel.blueLandCount() + 1 );
                return;
            case 'B' :
                ViewModel.blackLandCount( ViewModel.blackLandCount() + 1 );
                return;
            case 'R' :
                ViewModel.redLandCount( ViewModel.redLandCount() + 1 );
                return;
            case 'G' :
                ViewModel.greenLandCount( ViewModel.greenLandCount() + 1 );
                return;
        }
    };
    
    this.decrLandCount = function( color ) {
        switch( color ) {
            case 'W' :
                if( ViewModel.whiteLandCount() > 0 ) {
                    ViewModel.whiteLandCount( ViewModel.whiteLandCount() - 1 );
                }
                return;
            case 'U' :
                if( ViewModel.blueLandCount() > 0 ) {
                    ViewModel.blueLandCount( ViewModel.blueLandCount() - 1 );
                }
                return;
            case 'B' :
                if( ViewModel.blackLandCount() > 0 ) {
                    ViewModel.blackLandCount( ViewModel.blackLandCount() - 1 );
                }
                return;
            case 'R' :
                if( ViewModel.redLandCount() > 0 ) {
                    ViewModel.redLandCount( ViewModel.redLandCount() - 1 );
                }
                return;
            case 'G' :
                if( ViewModel.greenLandCount() > 0 ) {
                    ViewModel.greenLandCount( ViewModel.greenLandCount() - 1 );
                }
                return;
        }
    };
    
};