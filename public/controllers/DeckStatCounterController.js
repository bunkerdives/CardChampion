var DeckStatCounterController = function() {
    
    this.adjustCardCounterUI = function( card, magnitude ) {
        
        var count = ( ViewModel.mainboardSize() + magnitude );
        if( count >= 0 ) {
            ViewModel.mainboardSize( count );
        }
        
        if( ( /Creature/g ).test( card.type ) ){
            ViewModel.numMainboardCreatures( ViewModel.numMainboardCreatures() + magnitude );
        } else if( ( /Land/g ).test( card.type ) ){
            ViewModel.numMainboardLands( ViewModel.numMainboardLands() + magnitude );
        }
    
    };
    
};