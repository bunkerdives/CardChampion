
var DeckPreviewViewModel = function( options ) {
    
    this.title = ko.observable( options.title );
    this.thumb = ko.observable( options.thumb );
    this.deckUrl = ko.observable( options.deckUrl );
    this.user = ko.observable( options.user );
    this.uuid = ko.observable( options.uuid );
    this.format = ko.observable( options.format );
    this.date = ko.observable( options.date );
    this.white = ko.observable( options.white );
    this.blue = ko.observable( options.blue );
    this.black = ko.observable( options.black );
    this.red = ko.observable( options.red );
    this.green = ko.observable( options.green );
    
};



ko.utils.extend( DeckPreviewViewModel.prototype, {
    
    init: function() {
        
    }
    
} );