var RecentDecksViewModel = function() {
    
    this.RecentDeckPreviews = ko.observableArray( [] );
    
    
    this.initRecentDecksView = function( decks ) {
        
        if( decks == undefined ) {
            return;
        }
        
        var self = this;
        
        ( function(self) {
            $.each( decks, function( index, deck ) {
                var recentDeckPreview = new RecentDeckPreViewModel();
                recentDeckPreview.initRecentDeckPreview( deck );
                self.RecentDeckPreviews()[ index ] = recentDeckPreview;
            } );
        } ) (self);
        
    };
    
};