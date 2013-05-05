var ED2 = require('../sets/2ED');
var ED3 = require('../sets/3ED');
var ED4 = require('../sets/4ED');
var DN5 = require('../sets/5DN');
var ED5 = require('../sets/5ED');
var ED6 = require('../sets/6ED');
var ED7 = require('../sets/7ED');
var ED8 = require('../sets/8ED');
var ED9 = require('../sets/9ED');
var E10 = require('../sets/10E');
var ALA = require('../sets/ALA');
var ALL = require('../sets/ALL');
var APC = require('../sets/APC');
var ARB = require('../sets/ARB');
var ARN = require('../sets/ARN');
var ATQ = require('../sets/ATQ');
var AVR = require('../sets/AVR');
var BOK = require('../sets/BOK');
var CHK = require('../sets/CHK');
var CON = require('../sets/CON');
var CSP = require('../sets/CSP');
var DIS = require('../sets/DIS');
var DKA = require('../sets/DKA');
var DRK = require('../sets/DRK');
var DST = require('../sets/DST');
var EVE = require('../sets/EVE');
var EXO = require('../sets/EXO');
var FEM = require('../sets/FEM');
var FUT = require('../sets/FUT');
var GPT = require('../sets/GPT');
var GTC = require('../sets/GTC');
var HML = require('../sets/HML');
var ICE = require('../sets/ICE');
var INV = require('../sets/INV');
var ISD = require('../sets/ISD');
var JUD = require('../sets/JUD');
var LEA = require('../sets/LEA');
var LEB = require('../sets/LEB');
var LEG = require('../sets/LEG');
var LGN = require('../sets/LGN');
var LRW = require('../sets/LRW');
var M10 = require('../sets/M10');
var M11 = require('../sets/M11');
var M12 = require('../sets/M12');
var M13 = require('../sets/M13');
var MBS = require('../sets/MBS');
var MIR = require('../sets/MIR');
var MMQ = require('../sets/MMQ');
var MOR = require('../sets/MOR');
var MRD = require('../sets/MRD');
var NMS = require('../sets/NMS');
var NPH = require('../sets/NPH');
var ODY = require('../sets/ODY');
var ONS = require('../sets/ONS');
var PCY = require('../sets/PCY');
var PLC = require('../sets/PLC');
var PLS = require('../sets/PLS');
var RAV = require('../sets/RAV');
var ROE = require('../sets/ROE');
var RTR = require('../sets/RTR');
var SCG = require('../sets/SCG');
var SHM = require('../sets/SHM');
var SOK = require('../sets/SOK');
var SOM = require('../sets/SOM');
var STH = require('../sets/STH');
var TMP = require('../sets/TMP');
var TOR = require('../sets/TOR');
var TSP = require('../sets/TSP');
var UDS = require('../sets/UDS');
var ULG = require('../sets/ULG');
var USG = require('../sets/USG');
var VIS = require('../sets/VIS');
var WTH = require('../sets/WTH');
var WWK = require('../sets/WWK');
var ZEN = require('../sets/ZEN');

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
        if( set in SetController.setList ) {
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

module.exports = SetController;