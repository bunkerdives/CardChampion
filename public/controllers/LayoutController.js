var LayoutController = function( template, options ) {
    
    // check cookies to see if user is logged in to an OpenID acct or as a guest
    var loggedIn = localStorage.getItem('auth');
    
    var context;
    switch( template ) {
        case 'Splash':
            context = new SplashViewModel();
            break;
        case 'Foyer':
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
            console.log("LayoutController PROFILE, user = " + options.username );
            break;
        default:
            window.location.replace('/'); // TODO make a 404 page
    }

    ViewModel = context;
    
    if( template == 'Profile'){
        this.plugin = new ko.plugin( { template : 'foyer', context : context } );
        ViewModel.profileVisible( true );
        ViewModel.aboutVisible( false );
        ViewModel.newEventVisible( false );
        ViewModel.joinDraftVisible( false );
        $("#title").html( options.username );
    } else {
        this.plugin = new ko.plugin( { template : template, context : context } );
    }
    
    // show the login lightbox if at a view without login. Any views that require login will be redirected to the foyer/splash page
    if( template != 'Splash'  &&  !loggedIn ) {
        LoginController.displayLoginLightbox();
    }
    
};


var initLayout = function( template, options ) {
    ko.applyBindings( new LayoutController( template, options ) );
};