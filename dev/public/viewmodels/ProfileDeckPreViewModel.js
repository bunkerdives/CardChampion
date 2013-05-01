var ProfileDeckPreViewModel = function() {
    
    this.title = ko.observable( '' );
    this.thumb = ko.observable( '' );
    this.deckUrl = ko.observable( '' );
    this.user = ko.observable( '' );
    this.uuid = ko.observable( '' );
    this.format = ko.observable( '' );
    this.date = ko.observable( '' );
    
    this.deckId = ko.observable('');
    this.deckUrl = ko.observable('');
    this.buildUrl = ko.computed( function(){
        return '/builder?deckId=' + this.deckId();
    }, this );
    
    this.white = ko.observable( false );
    this.blue = ko.observable( false );
    this.black = ko.observable( false );
    this.red = ko.observable( false );
    this.green = ko.observable( false );
    
    this.initProfileDeckPreView = function( deckPreview ) {
        
        if( deckPreview == undefined ) {
            return;
        }
        
        this.title( deckPreview.title );
        this.thumb( deckPreview.thumb );
        this.deckUrl( deckPreview.deckUrl );
        this.user( deckPreview.user );
        this.uuid( deckPreview.uuid );
        this.format( deckPreview.format );
        this.date( deckPreview.date );
        this.deckId( deckPreview._id );
        
        this.deckUrl( deckPreview.deckUrl );
        
        this.white( deckPreview.white );
        this.blue( deckPreview.blue );
        this.black( deckPreview.black );
        this.red( deckPreview.red );
        this.green( deckPreview.green );
        
    }
    
};