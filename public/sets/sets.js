Sets = {
    
    'set_list' : [
        'RtR'
        , 'M13'
        , 'AVR'
        , 'DKA'
        , 'INN'
    ]
    
    , function : getSetList( set ) {
        
        switch( set ){
            case( 'RtR' ):
                return RtR.set_list;
            default:
                return null;
        }
        
    }
    
    , function : getCardData( set ) {
        
        switch( set ){
            case( 'RtR' ):
                return RtR.card_data;
            return null;
        }
    }
    
};