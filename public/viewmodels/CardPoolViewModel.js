var CardPoolViewModel = function( type ) {
    
    this.type = type;
    this.columns = ko.observableArray( [ ] );
    
    this.newCardPoolInstance = function( cards ) {
        // sort the cards by cmc
        cards = cards.sort( this.sortPoolByCmc );
        this.formColumnsByCmc( cards );
    };
    
    this.addCardToPool = function( card ) {
        
        if( this.columns().length == 0 ){
            var newColumn = new ColumnViewModel( [ card ] );
            newColumn.setCmc( card.cmc );
            this.columns.push( newColumn );
            return;
        }
        
        var cmc = card.cmc;
        var curCol;
        
        var i = 0;
        for(  ; i < this.columns().length; ++i ) {
            
            var column = this.columns()[i];
            var colCmc = column.cmc;
            
            if( cmc == colCmc ) {
                // add to this column
                this.columns()[i].cards.push(card);
                this.columns()[i].sortColumn();
                return;
            }
            else if( cmc < colCmc ) {
                var newColumn = new ColumnViewModel( [ card ] );
                newColumn.setCmc( card.cmc );
                this.columns().splice( i, 0, newColumn );
                this.columns()[i].sortColumn();
                this.columns.push();
                return;
            }
            
        }
        
        // if the code has reached this point, the new card has no columns to go into
        // and its respectable column's cmc is larger than all the others
        // Create a new column for the card and add it to the end of this CardPoolViewModel's columns observableArray
        var newColumn = new ColumnViewModel( [ card ] );
        newColumn.setCmc( card.cmc );
        this.columns.push( newColumn );
        this.columns()[i].sortColumn();
        
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
        var col = 0;
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
                ColumnView.sortColumn();
                ColumnView.setCmc( col );
                this.columns.push( ColumnView );
                column = [];
                column.push( curCard );
                curCost = curCard.cmc;
                ++ col;
            }
            
            ++ i;
        }
        
    }
    
};