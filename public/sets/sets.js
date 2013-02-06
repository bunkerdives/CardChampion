Sets = {
    
    'set_list' : [
        'GTC'
    ]
    
    , getSetList : function( set ) {
        
        switch( set ){
            case( 'GTC' ):
                return RtR.set_list;
            default:
                return null;
        }
        
    }
    
    , getCardData : function( set ) {
        
        switch( set ){
            case( 'GTC' ):
                return RtR.card_data;
            return null;
        }
    }
    
};