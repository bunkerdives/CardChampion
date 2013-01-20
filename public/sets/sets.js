Sets = {
    
    'set_list' : [
        'GTC'
        , 'RTR'
        , 'M13'
        , 'AVR'
        , 'DKA'
        , 'INN'
    ]
    
    , function : getSetList( set ) {
        
        switch( set ){
            case( 'GTC' ):
                return RtR.set_list;
            default:
                return null;
        }
        
    }
    
    , function : getCardData( set ) {
        
        switch( set ){
            case( 'GTC' ):
                return RtR.card_data;
            return null;
        }
    }
    
};