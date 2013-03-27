var ProfileDeckItemViewModel = function( cardWrapper ) {
    
    this.total = ko.observable( '' );
    this.name = ko.observable( '' );
    
    this.title = ko.computed( function() {
        return this.total() + "x <a>" + this.name() + "</a>";
    }, this );
    
    this.initProfileDeckItem = function( cardWrapper ) {
        
        if( !cardWrapper ) {
            return;
        }
        
        this.total( cardWrapper.total );
        this.name( cardWrapper.card.name );
        
    }
    
    
};