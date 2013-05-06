var $ = require('jQuery');
var fs = require('fs');

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
	
	, createMultiverseMap : function() {
		
		fs.open('multiverse_map.js', 'a', 777, function( e, id ) {
		
			$.each( SetController.setList, function(set, setObj) {
				var setCardData = setObj.card_data;
			
				$.each( setCardData, function(cardnum, cardObj) {
				
					var multiverse = cardObj.multiverse;
				
					cardData = ", \"" + multiverse + "\" : {\n"
					cardData += "    set : \"" + set + "\"\n"
					cardData += "    , cardnum : \"" + cardnum + "\"\n"
					cardData += "}\n"
					
			  		fs.write( id, cardData, null, 'utf8', function() {
			  			fs.close( id, function() {
			  				console.log('file closed');
			  		    } );
			  		 } );
				
				} );
			
			} );
			
		} );
		
	}
	
	, createNameToMultiverseMap : function() {
	
		fs.open('NameToMultiverse.js', 'a', 777, function( e, id ){
		
			$.each( SetController.setList, function(set, setObj){
			
				var setCardData = setObj.card_data;
				
				$.each( setCardData, function(cardnum, cardObj){
				
					var name = cardObj.name;
					var multiverse = cardObj.multiverse;
				
					//cardData = ", '" + name + "' : '" + multiverse + "'\n"
					cardData = ', "' + name + '" : "' + multiverse + '"\n'
					
			  		fs.write( id, cardData, null, 'utf8', function() {
			  			fs.close( id, function() {} );
			  		 } );
				
				})
			
			})
		
		})
	
	}
	
	, createMultiverseToNameSetMap : function() {
		
		fs.open('MultiverseToNameSetMap.js', 'a', 777, function( e, id ){
		
			$.each( SetController.setList, function(set, setObj){
			
				var setCardData = setObj.card_data;
				
				$.each( setCardData, function(cardnum, cardObj){
				
					var multiverse = cardObj.multiverse;
					var name = cardObj.name;
				
					cardData = ", \"" + multiverse + "\" : {\n"
					cardData += "    name : \"" + name + "\"\n"
					cardData += "    , set : \"" + set + "\"\n"
					cardData += "}\n"
					
			  		fs.write( id, cardData, null, 'utf8', function() {
			  			fs.close( id, function() {} );
			  		 } );
					
				})
			
			})
		
		})
		
	}
	
	, createMultiverseToNameSetMapOld : function() {
		
		fs.open('MultiverseToNameSetMapOld.js', 'a', 777, function( e, id ){
		
			var sets = {
				'ARN' : SetController.getSet('ARN')
				, 'ATQ' : SetController.getSet('ATQ')
				, 'LEG' : SetController.getSet('LEG')
				, 'DRK' : SetController.getSet('DRK')
				, 'FEM' : SetController.getSet('FEM')
				, 'HML' : SetController.getSet('HML')
				, 'ICE' : SetController.getSet('ICE')
				, 'ALL' : SetController.getSet('ALL')
				, 'CSP' : SetController.getSet('CSP')
				, 'MIR' : SetController.getSet('MIR')
				, 'VIS' : SetController.getSet('VIS')
				, 'WTH' : SetController.getSet('WTH')
				, 'TMP' : SetController.getSet('TMP')
				, 'STH' : SetController.getSet('STH')
				, 'EXO' : SetController.getSet('EXO')
				, 'USG' : SetController.getSet('USG')
				, 'ULG' : SetController.getSet('ULG')
				, 'UDS' : SetController.getSet('UDS')
				, 'MMQ' : SetController.getSet('MMQ')
				, 'NMS' : SetController.getSet('NMS')
				, 'PCY' : SetController.getSet('PCY')
				, 'INV' : SetController.getSet('INV')
				, 'PLS' : SetController.getSet('PLS')
				, 'APC' : SetController.getSet('APC')
				, 'ODY' : SetController.getSet('ODY')
				, 'TOR' : SetController.getSet('TOR')
				, 'JUD' : SetController.getSet('JUD')
				, 'ONS' : SetController.getSet('ONS')
				, 'LGN' : SetController.getSet('LGN')
				, 'SCG' : SetController.getSet('SCG')
			
				, 'LEA' : SetController.getSet('LEA')
				, 'LEB' : SetController.getSet('LEB')
				, '2ED' : SetController.getSet('2ED')
				, '3ED' : SetController.getSet('3ED')
				, '4ED' : SetController.getSet('4ED')
				, '5ED' : SetController.getSet('5ED')
				, '6ED' : SetController.getSet('6ED')
				, '7ED' : SetController.getSet('7ED')
				, '8ED' : SetController.getSet('8ED')
			}
		
			$.each( sets, function(set, setObj){
			
				var setCardData = setObj.card_data;
				
				$.each( setCardData, function(cardnum, cardObj){
				
					var multiverse = cardObj.multiverse;
					var name = cardObj.name;
				
					cardData = ", \"" + multiverse + "\" : {\n"
					cardData += "    name : \"" + name + "\"\n"
					cardData += "    , set : \"" + set + "\"\n"
					cardData += "}\n"
					
			  		fs.write( id, cardData, null, 'utf8', function() {
			  			fs.close( id, function() {} );
			  		 } );
					
				})
			
			})
		
		})
		
	}
	
	, createMultiverseToNameSetMapNew : function() {
		
		fs.open('MultiverseToNameSetMapNew.js', 'a', 777, function( e, id ){
		
			var sets = {
				'MRD' : SetController.getSet('MRD')
				, 'DST' : SetController.getSet('DST')
				, '5DN' : SetController.getSet('5DN')
				, 'CHK' : SetController.getSet('CHK')
				, 'BOK' : SetController.getSet('BOK')
				, 'SOK' : SetController.getSet('SOK')
				, 'RAV' : SetController.getSet('RAV')
				, 'GPT' : SetController.getSet('GPT')
				, 'DIS' : SetController.getSet('DIS')
				, 'TSP' : SetController.getSet('TSP')
				, 'PLC' : SetController.getSet('PLC')
				, 'FUT' : SetController.getSet('FUT')
				, 'LRW' : SetController.getSet('LRW')
				, 'MOR' : SetController.getSet('MOR')
				, 'SHM' : SetController.getSet('SHM')
				, 'EVE' : SetController.getSet('EVE')
				, 'ALA' : SetController.getSet('ALA')
				, 'CON' : SetController.getSet('CON')
				, 'ARB' : SetController.getSet('ARB')
				, 'ZEN' : SetController.getSet('ZEN')
				, 'WWK' : SetController.getSet('WWK')
				, 'ROE' : SetController.getSet('ROE')
				, 'SOM' : SetController.getSet('SOM')
				, 'MBS' : SetController.getSet('MBS')
				, 'NPH' : SetController.getSet('NPH')
				, 'ISD' : SetController.getSet('ISD')
				, 'DKA' : SetController.getSet('DKA')
				, 'AVR' : SetController.getSet('AVR')
				, 'RTR' : SetController.getSet('RTR')
				, 'GTC' : SetController.getSet('GTC')
			
				, '9ED' : SetController.getSet('9ED')
				, '10E' : SetController.getSet('10E')
				, 'M10' : SetController.getSet('M10')
				, 'M11' : SetController.getSet('M11')
				, 'M12' : SetController.getSet('M12')
				, 'M13' : SetController.getSet('M13')
			}
		
			$.each( sets, function(set, setObj){
			
				var setCardData = setObj.card_data;
				
				$.each( setCardData, function(cardnum, cardObj){
				
					var multiverse = cardObj.multiverse;
					var name = cardObj.name;
				
					cardData = ", \"" + multiverse + "\" : {\n"
					cardData += "    name : \"" + name + "\"\n"
					cardData += "    , set : \"" + set + "\"\n"
					cardData += "}\n"
					
			  		fs.write( id, cardData, null, 'utf8', function() {
			  			fs.close( id, function() {} );
			  		 } );
					
				})
			
			})
		
		})
		
	}
    
};

module.exports = SetController;