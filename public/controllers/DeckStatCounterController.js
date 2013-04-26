var DeckStatCounterController = function() {
    
    // adjustCardCounterUI - adjust the mainboard, creature and land counter observables (and thus updating the UI)
    this.adjustCardCounterUI = function( card, magnitude ) {
        
        // update the mainboard counter observable
        var count = ( ViewModel.mainboardSize() + magnitude );
        if( count >= 0 ) {
            ViewModel.mainboardSize( count );
        }
        
        // update the land and creature counter observables (if the card is of one of those types)
        if( ( /Creature/g ).test( card.type ) ){
            ViewModel.numMainboardCreatures( ViewModel.numMainboardCreatures() + magnitude );
        } else if( ( /Land/g ).test( card.type ) ){
            ViewModel.numMainboardLands( ViewModel.numMainboardLands() + magnitude );
        }
    
    };
    
    // adjustSideboardCounter - adjust the sideboard counter observable (and thus updating the UI)
    this.adjustSideboardCounter = function( magnitude ) {
        ViewModel.sideboardSize( ViewModel.sideboardSize() + magnitude );
    };
    
};