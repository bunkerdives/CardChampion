var ProfileDeckListViewModel = function() {
    
    this.ProfileDeckPreviews = ko.observableArray( [] );
    
    
    this.initDeckPreviews = function( decks ) {
        
        if( decks == undefined ) {
            return;
        }
        
        var self = this;
        
        ( function(self) {
            $.each( decks, function( index, deckPreviewData ) {
                var profileDeckPreview = new ProfileDeckPreViewModel();
                profileDeckPreview.initProfileDeckPreView( deckPreviewData );
                self.ProfileDeckPreviews()[ index ] = profileDeckPreview;
            } );
        } ) (self);
        
    };
    
    
};