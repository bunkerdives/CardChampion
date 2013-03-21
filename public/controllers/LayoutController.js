var LayoutController = function( template, options ) {
    
    var context;
    switch( template ) {
        case 'Splash':
            context = new SplashViewModel();
            break;
        case 'Decks':
            context = new FoyerViewModel();
            break;
        case 'Limited':
            if( options.format == 'sealed' ) {
                context = new SealedViewModel( options.set );
                context.newSealedInstance();
            }
            else {
                window.location.replace('/');
            }
            break;
        case 'Profile':
            context = new FoyerViewModel();
            break;
        case 'NewEvent':
            context = new FoyerViewModel();
            break;
        case 'Draft':
            context = new FoyerViewModel();
            break;
        case 'About':
            context = new FoyerViewModel();
            break;
        default:
            window.location.replace('/'); // TODO make a 404 page
    }

    ViewModel = context;
    ViewModel.socketController = new SocketController();
    
    if( template == 'Decks' ) {
        this.plugin = new ko.plugin( { template : 'foyer', context : context } );
        ViewModel.decksVisible = ko.observable( true );
        ViewModel.profileVisible( false );
        ViewModel.aboutVisible( false );
        ViewModel.newEventVisible( false );
        ViewModel.joinDraftVisible( false );
        $("#title").html( options.username );
    }
    else if( template == 'NewEvent'){
        this.plugin = new ko.plugin( { template : 'foyer', context : context } );
        ViewModel.decksVisible = ko.observable( false );
        ViewModel.profileVisible( false );
        ViewModel.aboutVisible( false );
        ViewModel.newEventVisible( true );
        ViewModel.joinDraftVisible( false );
        $("#title").html( options.username );
    }
    else if( template == 'Draft'){
        this.plugin = new ko.plugin( { template : 'foyer', context : context } );
        ViewModel.decksVisible = ko.observable( false );
        ViewModel.profileVisible( false );
        ViewModel.aboutVisible( false );
        ViewModel.newEventVisible( false );
        ViewModel.joinDraftVisible( true );
        $("#title").html( options.username );
    }
    else if( template == 'About'){
        this.plugin = new ko.plugin( { template : 'foyer', context : context } );
        ViewModel.decksVisible = ko.observable( false );
        ViewModel.profileVisible( false );
        ViewModel.aboutVisible( true );
        ViewModel.newEventVisible( false );
        ViewModel.joinDraftVisible( false );
        $("#title").html( options.username );
    }
    else if( template == 'Profile'){
        this.plugin = new ko.plugin( { template : 'foyer', context : context } );
        ViewModel.decksVisible = ko.observable( false );
        ViewModel.profileVisible( true );
        ViewModel.aboutVisible( false );
        ViewModel.newEventVisible( false );
        ViewModel.joinDraftVisible( false );
        $("#title").html( options.username );
    } else {
        this.plugin = new ko.plugin( { template : template, context : context } );
    }
    
    if( options.user != 'null' ) {
        $("#header-link-5").attr( 'href', '/' + options.user );
    } else {
        $("#header-link-5").css( 'display', 'none' );
    }
    
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