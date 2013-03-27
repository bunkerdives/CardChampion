var ProfileDeckViewModel = function() {
    
    this.title = ko.observable( '' );
    this.description = ko.observable( '' );
    
    this.white = ko.observable( false );
    this.blue = ko.observable( false );
    this.black = ko.observable( false );
    this.red = ko.observable( false );
    this.green = ko.observable( false );
    
    this.leftColumn = ko.observableArray( [] );
    this.rightColumn = ko.observableArray( [] );
    
    this.initProfileDeckView = function( deck ) {
        
        if( deck == undefined ) {
            return;
        }
        
        this.title( deck.title );
        this.description( deck.description );
        
        this.white( deck.white );
        this.blue( deck.blue );
        this.black( deck.black );
        this.red( deck.red );
        this.green( deck.green );
        
    }
    
};