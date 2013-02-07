Sets = {
    
    set_list : {
        '2ED' : ED2
        , '3ED' : ED3
        , '4ED' : ED4
        , '5DN' : DN5
        , '5ED' : ED5
        , '6ED' : ED6
        , '7ED' : ED7
        , '8ED' : ED8
        , '9ED' : ED9
        , '10E' : E10
        , 'ALA' : ALA
        , 'ALL' : ALL
        , 'APC' : APC
        , 'ARB' : ARB
        , 'ARN' : ARN
        , 'ATQ' : ATQ
        , 'AVR' : AVR
        , 'BOK' : BOK
        , 'CHK' : CHK
        , 'CON' : CON
        , 'CSP' : CSP
        , 'DIS' : DIS
        , 'DKA' : DKA
        , 'DRK' : DRK
        , 'DST' : DST
        , 'EVE' : EVE
        , 'EXO' : EXO
        , 'FEM' : FEM
        , 'FUT' : FUT
        , 'GPT' : GPT
        , 'GTC' : GTC
        , 'HML' : HML
        , 'ICE' : ICE
        , 'INV' : INV
        , 'ISD' : ISD
        , 'JUD' : JUD
        , 'LEA' : LEA
        , 'LEB' : LEB
        , 'LEG' : LEG
        , 'LGN' : LGN
        , 'LRW' : LRW
        , 'M10' : M10
        , 'M11' : M11
        , 'M12' : M12
        , 'M13' : M13
        , 'MBS' : MBS
        , 'MIR' : MIR
        , 'MMQ' : MMQ
        , 'MOR' : MOR
        , 'MRD' : MRD
        , 'NMS' : NMS
        , 'NPH' : NPH
        , 'ODY' : ODY
        , 'ONS' : ONS
        , 'PCY' : PCY
        , 'PLS' : PLS
        , 'RAV' : RAV
        , 'ROE' : ROE
        , 'RTR' : RTR
        , 'SCG' : SCG
        , 'SHM' : SHM
        , 'SOK' : SOK
        , 'SOM' : SOM
        , 'STH' : STH
        , 'TMP' : TMP
        , 'TOR' : TOR
        , 'TSP' : TSP
        , 'UDS' : UDS
        , 'ULG' : ULG
        , 'USG' : USG
        , 'VIS' : VIS
        , 'WTH' : WTH
        , 'WWK' : WWK
        , 'ZEN' : ZEN
    }
    
    , validSet : function( set ) {
        
        if( set in Sets.set_list ){
            return true;
        }
        else{
            return false;
        }
        
    }
    
    , getSet : function( set ) {
        
        // check if set is in our sets hash, and if so, return the set object
        if( set in Sets.set_list ){
            if( Sets.set_list == null ){
                $.getScript('sets/' + set + '.js');
                Sets.set_list
            }
            else{
                
            }
            return Sets.set_list[set];
        }
        else{
            return null;
        }
        
    }
    
};