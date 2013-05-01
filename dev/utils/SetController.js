var SetController = {
    
    // hash mapping set acronyms to set objects
    setList : {
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
        , 'PLC' : PLC
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
    
    // validSet - is the given set a legitimate one?
    , validSet : function( set ) {
        if( set in Sets.setList ) {
            return true;
        } else {
            return false;
        }
    }
    
    // getSet - fetches the set data for a given real set, else null
    , getSet : function( set ) {
        if( set in SetController.setList ) {
            return SetController.setList[set];
        } else {
            return null;
        }
    }
    
};