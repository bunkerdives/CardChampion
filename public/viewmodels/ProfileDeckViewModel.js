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
    
    this.deckViewURL = ko.observable( '' );
    
    this.initProfileDeckView = function( deckContainer, deck ) {
        
        if( deck == undefined ) {
            return;
        }
        
        this.title( deckContainer.title );
        this.author( deckContainer.author );
        this.description( deckContainer.description );
        this.thumb( deckContainer.thumb );
        
        this.white( deckContainer.white );
        this.blue( deckContainer.blue );
        this.black( deckContainer.black );
        this.red( deckContainer.red );
        this.green( deckContainer.green );
        
        this.populateMainboard( deck );
        
        this.setShareThisDeckURL();
        
    };
    
    this.setShareThisDeckURL = function() {
        this.deckViewURL( document.URL );
    }
    
    
    this.populateMainboard = function( deck ) {
        
        var mainboard = deck.mainboard;
        
        // TODO calculate an optimal ordering based on the number of cards for each type
        
        this.populateTypeCardsIfPresent( 'Creatures', mainboard.creatures, this.leftColumn );
        this.populateTypeCardsIfPresent( 'Lands', mainboard.lands, this.leftColumn );
        this.populateTypeCardsIfPresent( 'Instants', mainboard.instants, this.rightColumn );
        this.populateTypeCardsIfPresent( 'Sorceries', mainboard.sorceries, this.rightColumn );
        this.populateTypeCardsIfPresent( 'Enchantments', mainboard.enchantments, this.rightColumn );
        this.populateTypeCardsIfPresent( 'Artifacts', mainboard.artifacts, this.rightColumn );
        this.populateTypeCardsIfPresent( 'Planeswalkers', mainboard.planeswalkers, this.rightColumn );
        this.populateTypeCardsIfPresent( 'Sideboard', mainboard.sideboard, this.rightColumn );
        
    };
    
    
    this.populateTypeCardsIfPresent = function( cardType, cardTypeArray, column ) {
        
        if( cardTypeArray != null ) {
            this.populateTypeCardsIntoBoard( cardType, cardTypeArray, column );
        }
        
    }
    
    
    this.populateTypeCardsIntoBoard = function( cardType, cardTypeArray, column ) {
        
        if( cardTypeArray.length > 0 ) {
            var profileDeckViewCardTypeViewModel = new ProfileDeckViewCardTypeGroupViewModel();
            profileDeckViewCardTypeViewModel.initCardTypeGroupView( cardType, cardTypeArray );
            column.push( profileDeckViewCardTypeViewModel );
        }
        
    };
    
};