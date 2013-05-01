var ProfileViewModel = function() {
    
    this.ProfileGeneralView = ko.observable( '' );
    
    this.ProfileDeckListViewModel = ko.observable( '' );
    this.ProfileDeckViewModel = ko.observable( '' );
    
    this.ProfileDeckListVisible = ko.observable( false );
    this.ProfileDeckVisible = ko.observable( false );
    
    this.initProfileView = function( profileData, deckContainer, deckCardData ) {

        this.initGeneralView( profileData );
        
        if( profileData == undefined ){
            this.initDeckListView( [] );
        } else {
            this.initDeckListView( profileData.decks );
        }
        
        this.initDeckView( deckContainer, deckCardData );
        
    }
    
    // initGeneralView() - create a ProfileGeneralViewModel and initialize its observables with general profile data
    this.initGeneralView = function( profileData ) {
        
        var profileGeneralView = new ProfileGeneralViewModel();
        profileGeneralView.initGeneralViewModel( profileData );
        this.ProfileGeneralView( profileGeneralView );
        
    };
    
    this.initDeckListView = function( decks ) {
        
        // create a ProfileDeckListViewModel with the deck preview list data
        var profileDeckListViewModel = new ProfileDeckListViewModel();
        profileDeckListViewModel.initDeckPreviews( decks );
        
        // assign the ProfileDeckListViewModel to this ProfileViewModel instance
        this.ProfileDeckListViewModel( profileDeckListViewModel );
        
    };
    
    this.initDeckView = function( deckContainer, deck ) {
        
        // create a ProfileDeckViewModel with some deck data
        var profileDeckViewModel = new ProfileDeckViewModel();
        profileDeckViewModel.initProfileDeckView( deckContainer, deck );
        this.ProfileDeckViewModel( profileDeckViewModel );
        
    };
    
    this.displayProfileDeckList = function() {
        this.ProfileDeckListVisible( true );
    };
    
    this.displayProfileDeckView = function() {
        this.ProfileDeckVisible( true );
    };
    
};