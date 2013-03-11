var LayoutController = function( template, options ) {
    
    // TODO check cookies to see if user is logged in to an OpenID acct or as a guest
    var loggedIn = false;
    
    var context;
    switch( template ) {
        case 'Splash':
            context = new SplashViewModel();
            break;
        case 'Foyer':
            context = new FoyerViewModel();
            break;
        case 'limited':
            if( options.format == 'sealed' ) {
                context = new SealedViewModel( options.set );
                context.newSealedInstance();
            }
            else {
                window.location.replace('/');
            }
            break;
        default: // TODO if not logged in AND trying to access a user only view, show the login lightbox over the current display
            window.location.replace('/'); // TODO make a 404 page
    }
    
    ViewModel = context;
    this.plugin = new ko.plugin( { template : template, context : context } );
    
    // show the login lightbox if at a view without login. Any views that require login will be redirected to the foyer/splash page
    if( template != 'Splash'  &&  !loggedIn ) {
        LoginController.displayLoginLightbox();
    }
    
};


var initLayout = function( template, options ) {
    ko.applyBindings( new LayoutController( template, options ) );
};