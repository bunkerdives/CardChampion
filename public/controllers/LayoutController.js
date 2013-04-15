var LayoutController = function( template, options ) {
    
    var context;
    switch( template ) {
        case 'Splash':
            context = new SplashViewModel();
            break;
        case 'Limited':
            if( options.format == 'sealed' ) {
                context = new SealedViewModel( options.set );
                context.newSealedInstance();
            } else {
                window.location.replace('/');
            }
            break;
        case 'Foyer':
            context = new FoyerViewModel();
            context.profileData = options.profile;
            context.decks = options.decks;
            context.subview = options.subview;
            context.deckName = options.deckname;
            context.deckContainer = options.deckContainer;
            context.deckCardData = options.deckData;
            context.showSubView();
            break;
        case 'Builder':
            context = new BuilderViewModel();
            break;
        default:
            window.location.replace('/'); // TODO make a 404 page
    }

    ViewModel = context;
    ViewModel.socketController = new SocketController();
    
    this.plugin = new ko.plugin( { template : template, context : context } );
    
    var loggedIn = options.authOrGuest;
    
    if( template != 'Splash'  &&  !loggedIn ) {
        LightboxController.showAuthLightbox();
    }
    else if( template != 'Splash' && loggedIn ) {
        ViewModel.socketController.socketioHandshake();
        LightboxController.closeAuthLightbox();
    }
    
};

var initLayout = function( template, options ) {
    ko.applyBindings( new LayoutController( template, options ) );
};