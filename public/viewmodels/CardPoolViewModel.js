var CardPoolViewModel = function( type ) {
    
    this.type = type;
    this.columns = ko.observableArray( [ ] );
    
    this.newCardPoolInstance = function( cards ) {
        
        // sort the cards by cmc
        cards = cards.sort( this.sortPoolByCmc );
        this.formColumnsByCmc( cards );
        
    };
    
    this.addCardToPool = function( card ) {
        
    };
    
    this.removeCardFromPool = function( view, col ) {
        
        this.columns()[col].cards.remove(view);
        
    };
    
    this.sortPoolByCmc = function( a, b ){
        return a.cmc - b.cmc;
    }
    
    this.formColumnsByCmc = function( cards ){
        
        if( cards.length == 0 ){
            return;
        }
        
        var i = 0;
        var curCard;
        var curCost = cards[i].cmc;
        var column = [];
        this.columns( [] );
        while( ( curCard = cards[i] ) != null ){
            if( curCard.cmc == curCost ){
                column.push( curCard );
            }
            else{
                var ColumnView = new ColumnViewModel( column );
                this.columns.push( ColumnView );
                column = [];
                column.push( curCard );
                curCost = curCard.cmc;
            }
            
            ++ i;
        }
        
    }
    
};