var ProfileDeckViewModel = function() {
    
    this.title = ko.observable( '' );
    this.author = ko.observable( '' );
    this.description = ko.observable( '' );
    this.thumb = ko.observable( '' );
    
    this.white = ko.observable( false );
    this.blue = ko.observable( false );
    this.black = ko.observable( false );
    this.red = ko.observable( false );
    this.green = ko.observable( false );
    
    this.leftColumn = ko.observableArray( [] );
    this.rightColumn = ko.observableArray( [] );
    
    
    this.initProfileDeckView = function( deck ) {
        
        if( deck == undefined ) {
            return;
        }
        
        this.title( deck.title );
        this.author( deck.author );
        this.description( deck.description );
        this.thumb( deck.thumb );
        
        this.white( deck.white );
        this.blue( deck.blue );
        this.black( deck.black );
        this.red( deck.red );
        this.green( deck.green );
        
        this.populateMainboard( deck );
        
    };
    
    
    this.populateMainboard = function( deck ) {
        
        var mainboard = deck.mainboard;
        
        this.populateTypeCardsIntoBoard( 'Creatures', mainboard.creatures, this.leftColumn );
        this.populateTypeCardsIntoBoard( 'Lands', mainboard.lands, this.leftColumn );
        
        this.populateTypeCardsIntoBoard( 'Instants', mainboard.instants, this.rightColumn );
        this.populateTypeCardsIntoBoard( 'Sorceries', mainboard.sorceries, this.rightColumn );
        this.populateTypeCardsIntoBoard( 'Enchantments', mainboard.enchantments, this.rightColumn );
        this.populateTypeCardsIntoBoard( 'Artifacts', mainboard.artifacts, this.rightColumn );
        this.populateTypeCardsIntoBoard( 'Planeswalkers', mainboard.planeswalkers, this.rightColumn );
        
    };
    
    
    this.populateTypeCardsIntoBoard = function( cardType, cardTypeArray, column ) {
        
        if( cardTypeArray.length > 0 ) {
            var profileDeckViewCardTypeViewModel = new ProfileDeckViewCardTypeGroupViewModel();
            profileDeckViewCardTypeViewModel.initCardTypeGroupView( cardType, cardTypeArray );
            column.push( profileDeckViewCardTypeViewModel );
        }
        
    };
    
};