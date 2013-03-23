/*function fullscreen(){
	//var docElm = document.documentElement;//Document fullscreen
	var docElm = document.getElementById('fullscreen-image');//Element fullscreen
	if (docElm.requestFullscreen) {
	    docElm.requestFullscreen();
	}
	else if (docElm.mozRequestFullScreen) {
	    docElm.mozRequestFullScreen();
	}
	else if (docElm.webkitRequestFullScreen) {
	    docElm.webkitRequestFullScreen();
	}
}*/

function bgStretch( src, oW, oH, iW, iH, l, t ) {
    
	var windowW = $(window).width();
	var windowH = $(window).height();
	var imgSrc = src;
	var imgOuterW = oW;
	var imgOuterH = oH;
	var imgInnerW = iW;
	var imgInnerH = iH;
	var imgLeft = l;
	var imgTop = t;
	
	var tmpH = (windowW * (imgInnerH / imgInnerW));
	var tmpW = windowW;
	if (tmpH < windowH) {
		tmpW = (windowH * (imgInnerW / imgInnerH));
	}
    
	var newW = ((imgOuterW / imgInnerW) * tmpW);
	var newH = ((imgOuterH / imgOuterW) * newW);
	var newL = (imgLeft * (newW / imgOuterW)) * -1;
	var newT = (imgTop * (newH / imgOuterH)) * -1;
	
	$('body').css( {
		"background-image": "url('" + imgSrc +"')",
		"background-size": newW + "px " + newH + "px",
		"background-position": newL + "px " + newT + "px"
	} );
    
}

function iMacLayout(){
	var iMacW = $('#imac-wrapper').width();
	var iMacH = iMacW * 0.76625;//H-W ratio of iMac
	var screenshotW = iMacW * 0.92125;//screen W-iMac W ratio 
	var screenshotH = screenshotW * 0.562432;//screen H-iMac H ratio
	var screenshotTop = iMacH * -0.946982;//negative margin top
	$("#imac-screenshot-wrapper").css( {
		"width": screenshotW,
		"height": screenshotH,
		"margin-top": screenshotTop
	} );
}

function splashLayout() {
	iMacLayout();
}

function splashInit() {
	splashLayout();
}

$(window).resize( function() {
	var splashExists = $("#splash").length;
	if( splashExists == 1 ) {
		splashLayout();
	}
} );

/*var multiverseid;
var cards;
var map;

var colors = ["red", "blue", "green", "yellow", "brown", "black"];*/



$('#splash').ready( function() {
	
	/*$("html").niceScroll({ 
		zindex : "2000",
		hidecursordelay : "100" 
	});*/
	
	
	
	//TYPEAHEAD
	//console.log('typeahead set.')
	
	
	//$('.typeahead').typeahead( {source: colors} );
	//console.log(colors)
	/*
	$('.typeahead').attr('data-source', colors);
	
	
	$('.typeahead').typeahead({                                
	  name: 'countries',                                                          
	  prefetch: '../data/countries.json',                                         
	  limit: 10                                                                   
	});
	*/
	
	/*$('#typeahead-test').typeahead({                                   
	  name: 'arabic',                                                             
	  local: [
		'Abe',
		'Dean',
		'Jesse',
		'Zach'
	  ]                                                                           
	});*/
	
	/*
	$('#profile-image-input').typeahead({

			
			source: function (query, process) {
				console.log("source")
				
			    cards = [];
			    map = {};
					
					var setData = SetController.getSet('GTC');
					var cardData = setData.card_data;
			    var data = [ ];
					
					$.each( cardData, function( index, value ) {
							var cardObj = { cardName : value.name, multiverse : value.multiverse };
							data.push( cardObj );
					} );
					
					console.log(data);
 
			    $.each( data, function (key, cardObj) {
			        map[ cardObj.cardName ] = cardObj;
			        cards.push( cardObj.cardName );
			    } );
 
			    process(states);
			}
			
			, updater: function (item) {
				
				multiverseid = map[item].multiverse;
				console.log("updater item = " + item)
				return item;
							
				//selectedProfileImg = profileImgMap[item];
				//return profileImgMap[item];
	    }
		
	});
	*/
	
	
	
	
});