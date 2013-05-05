var FoyerViewModel = function() {
    
	this.viewName = 'Foyer';
	
	this.hidePreviewTimeout = 0;
    
    this.subview = '';
	this.profileData = '';
    this.decks = '';
    this.deckContainer = '';
    this.deckCardData = '';
    
    this.decksVisible = ko.observable( false );
    this.profileVisible = ko.observable( false );
    this.aboutVisible = ko.observable( false );
    this.newEventVisible = ko.observable( false );
    this.joinDraftVisible = ko.observable( false );
    
    this.RecentDecksViewModel = ko.observable( '' );
    this.ProfileViewModel = ko.observable( '' );
    this.NewSealedViewModel = ko.observable( '' );
    
    
    this.showSubView = function() {
        
        switch( this.subview ) {
            case 'ProfileDecks' :
                this.initProfileViewModel();
                this.showProfileDeckListView();
                break;
            case 'ProfileDeck' :
                this.initProfileViewModel();
                this.showProfileDeckView();
                break;
            case 'About' :
                this.initAboutViewModel();
                this.showAboutView();
                break;
            case 'Draft' :
                this.initDraftViewModel();
                this.showNewDraftView();
                break;
            case 'NewEvent' :
                this.initEventViewModel();
                this.showNewSealedView();
                break;
            case 'Decks' :
                this.initDecksViewModel();
                this.showDecksView();
                break;
        }
        
    };
    
    
    this.initDecksViewModel = function() {
        
        var recentDecksViewModel = new RecentDecksViewModel();
        if( this.decks ) {
            recentDecksViewModel.initRecentDecksView( this.decks );
        }
        this.RecentDecksViewModel( recentDecksViewModel );
        
    };
    
    this.initProfileViewModel = function() {
        
        var profileViewModel = new ProfileViewModel();
        profileViewModel.initProfileView( this.profileData, this.deckContainer, this.deckCardData );
        this.ProfileViewModel( profileViewModel );
        
    };
    
    this.initAboutViewModel = function() {
        
    };
    
    this.initDraftViewModel = function() {
        
    };
    
    this.initEventViewModel = function() {
        this.NewSealedViewModel( new NewSealedViewModel() );
    };
    
    
    
    this.showProfileDeckListView = function() {
        this.ProfileViewModel().displayProfileDeckList();
        this.profileVisible(true);
    };
    
    this.showProfileDeckView = function() {
        this.ProfileViewModel().displayProfileDeckView();
        this.profileVisible(true);
    };
    
    this.showAboutView = function() {
        this.aboutVisible(true);
    };
    
    this.showNewDraftView = function() {
        this.joinDraftVisible(true);
    };
    
    this.showNewSealedView = function() {
        this.newEventVisible(true);
    };
    
    this.showDecksView = function() {
        this.decksVisible(true);
    };
		
};


ko.utils.extend( FoyerViewModel.prototype, {
    
    init: function() {
        
        jQuery(document).ready( function ($) {
            BackgroundController.setBackgroundImage();
            BannerController.setAnimatedBanner();
            ChatController.bindEnterKeyForChat();
    	    FoyerViewController.foyerInit();
    		headerLayout();
            FoyerViewController.profileLayout();
        } );
        
    }
    
} );