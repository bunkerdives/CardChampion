var ProfileDeckViewCardTypeGroupViewModel = function() {
    
    this.cardType = ko.observable( '' );
    this.cardTypeTotal = ko.observable( 0 );
    this.self = this;
    
    this.cardTypeGroupTitle = ko.computed( function(){
        return this.cardType() + " (<span>" + this.cardTypeTotal() + "</span>)";
    }, this );
    
    this.cards = ko.observableArray( [] );
    
    
    this.initCardTypeGroupView = function( cardType, cardWrappers ) {
        
        var self = this;
        
        // set the card type of this card type group
        this.cardType( cardType );
        
        // assign the individual card wrappers to this group's list of cards
        ( function( self ){
            $.each( cardWrappers, function(index, cardWrapper) {
                var profileDeckItemViewModel = new ProfileDeckItemViewModel();
                profileDeckItemViewModel.initProfileDeckItem( cardWrapper );
                self.cards.push( profileDeckItemViewModel );
                self.cardTypeTotal( self.cardTypeTotal() + parseInt( cardWrapper.total ) );
            } );
        } ) ( self );
        
    }
    
}