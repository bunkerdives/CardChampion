var ColumnViewModel = function( cards ) {
  
    this.cards = ko.observableArray( cards );
    
    this.type = "cmc";
    
    this.cmc;
    
    this.setCmc = function( cmc ) {
        this.cmc = cmc;
    };
    
    this.sortColumn = function() {
        this.cards.sort( this.sortColumnByName );
    }
    
    this.sortColumnByName = function( a, b ){
        return a.name.toUpperCase().localeCompare( b.name.toUpperCase() );
    }
    
};