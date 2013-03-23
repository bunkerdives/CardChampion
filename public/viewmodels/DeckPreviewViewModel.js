
var DeckPreviewViewModel = function( options ) {
    
    this.title = ko.observable( options.title );
    this.thumb = ko.observable( options.thumb );
    this.user = ko.observable( options.user );
    this.uuid = ko.observable( options.uuid );
    this.format = ko.observable( options.format );
    
    
    var colors = options.colors;
    
    this.white = ko.observable( colors.white );
    this.blue = ko.observable( colors.blue );
    this.black = ko.observable( colors.black );
    this.red = ko.observable( colors.red );
    this.green = ko.observable( colors.green );
    
};



ko.utils.extend( DeckPreviewViewModel.prototype, {
    
    init: function() {
        
    }
    
} );