var SealedViewModel = function( set ) {
    
    this.set = set;
    this.sideboard = ko.observable( '' );
    this.mainboard = ko.observable( '' );
    
    this.newSealedInstance = function() {
        
        console.log("newSealedInstance");
        
        // generate a sealed card pool, given to us as an array of CardViewModels
        var cards = this.newSealedPool();
        console.log( cards );
        
        // create sideboard CardPoolViewModel and add the generated card pool to it
        var sideboard = new CardPoolViewModel();
        sideboard.newCardPoolInstance( cards );
        this.sideboard( sideboard );
        
        // create mainboard CardPoolViewModel
        var mainboard = new CardPoolViewModel();
        mainboard.newCardPoolInstance( [] );
        this.mainboard( mainboard );
        
    };
    
    this.addCardToMainboard = function() {
        
    };
    
    this.addCardToSideboard = function() {
        
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
    init: function( ) {
        console.log("SealedSetList init");
    }
} );