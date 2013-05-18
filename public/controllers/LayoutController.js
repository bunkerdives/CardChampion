var TemplateOptions = {
	template : ''
	, context : ''
}

var LayoutController = function( template, options ) {
    
    var context;
    
    switch( template ) {
        case 'Splash':
            context = new SplashViewModel();
            break;
        case 'Limited':
            if( options.format == 'Sealed' ) {
				boosters = JSON.parse(options.boosters);
                context = new SealedViewModel(boosters);
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
			context.cardData = options.cardData;
			context.cardnum = options.cardnum;
			context.set = options.set;
			context.setAbbr = options.setAbbr;
			context.setTotal = options.setTotal;
            context.showSubView();
            break;
        case 'Builder':
            context = new BuilderViewModel();
            context.deckData = options.deckData;
            context.deckContainer = options.deckContainer;
            break;
        default:
            window.location.replace('/'); // TODO make a 404 page
    }

    ViewModel = context;
    
    this.plugin = new ko.plugin( {
        template : template
        , context : context }
    );
	
	TemplateOptions.template = template;
	TemplateOptions.context = context;
    
    var loggedIn = options.auth;
    
    if( template != 'Splash'  &&  !loggedIn ) {
        LightboxController.showLightbox( 'Auth' );
    }
    else if( template != 'Splash' && loggedIn ) {
        SocketController.socketioHandshake();
        LightboxController.closeLightbox();
    }
    
};

var initLayout = function( template, options ) {
    ko.applyBindings( new LayoutController( template, options ) );
};