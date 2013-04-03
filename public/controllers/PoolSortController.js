var PoolSortController = function() {
    
    this.selectSortOption = function( type ) {
    
        switch( type ) {
            case 'cmc' :
                ViewModel.selectedSortOption = ViewModel.sortOptions()[0];
                $("#aSortDisplay").html('by cost');
                return;
            case 'color' :
                ViewModel.selectedSortOption = ViewModel.sortOptions()[1];
                $("#aSortDisplay").html('by color');
                return;
            case 'rarity' :
                ViewModel.selectedSortOption = ViewModel.sortOptions()[2];
                $("#aSortDisplay").html('by rarity');
                return;
        }
    
    };
    
    this.sortPool = function( boardType ) {
        
        var sortType = ViewModel.selectedSortOption.sortType;
        
        if( boardType == "sideboard" ) {
            ViewModel.sideboard()[0].sortPoolByType( sortType, "name" );
        } else if( boardType == "mainboard" ) {
            ViewModel.mainboard()[0].sortPoolByType( sortType, "name" );
        }
        
    };
    
};