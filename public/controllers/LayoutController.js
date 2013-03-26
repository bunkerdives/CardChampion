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
            context = new FoyerViewModel( options.subview );
            context.profileData = options.profile;
            context.subview = options.subview;
            context.deckName = options.deckname;
            console.log( "Foyer Layout COntroller, subView = " + options.subview );
            break;
        default:
            window.location.replace('/'); // TODO make a 404 page
    }

    ViewModel = context;
    ViewModel.socketController = new SocketController();
    
    this.plugin = new ko.plugin( { template : template, context : context } );
    
    if( options.user != 'null' ) {
        $("#header-link-5").attr( 'href', options.user );
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
    
    if( template == 'Foyer' ) {
        jQuery(document).ready( function($){
            profileLayout();
        });
    }
    
    console.log("end LayoutController")
    
};

var hideFoyerSubViews = function() {
    ViewModel.decksVisible = ko.observable( false );
    ViewModel.profileVisible( false );
    ViewModel.aboutVisible( false );
    ViewModel.newEventVisible( false );
    ViewModel.joinDraftVisible( false );
};


var initLayout = function( template, options ) {
    ko.applyBindings( new LayoutController( template, options ) );
};