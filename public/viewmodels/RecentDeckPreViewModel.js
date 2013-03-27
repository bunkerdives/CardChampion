var RecentDeckPreViewModel = function() {
    
    this.title = ko.observable( '' );
    this.format = ko.observable( '' );
    this.author = ko.observable( '' );
    this.thumb = ko.observable( '' );
    
    this.white = ko.observable( false );
    this.blue = ko.observable( false );
    this.black = ko.observable( false );
    this.red = ko.observable( false );
    this.green = ko.observable( false );
    
    
    this.initRecentDeckPreview = function( deck ) {
        
        if( deck == undefined ) {
            return;
        }
        
        this.title( deck.title );
        this.thumb( deck.thumb );
        this.author( deck.user );
        this.format( deck.format );
        this.white( deck.white );
        this.blue( deck.blue );
        this.black( deck.black );
        this.red( deck.red );
        this.green( deck.green );
        
        
    }
    
};