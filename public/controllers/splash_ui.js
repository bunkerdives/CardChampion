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
	
	var tmpH = ( windowW * ( imgInnerH / imgInnerW ) );
	var tmpW = windowW;
	if ( tmpH < windowH ) tmpW = ( windowH * ( imgInnerW / imgInnerH ) );

    
	var newW = ( (imgOuterW / imgInnerW) * tmpW );
	var newH = ( (imgOuterH / imgOuterW) * newW );
	var newL = -(imgLeft * (newW / imgOuterW));
	var newT = -(imgTop * (newH / imgOuterH));
	
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



var cards = [];
var map = {};

$(document).ready( function() {
	
	/*$("html").niceScroll({ 
		zindex : "2000",
		hidecursordelay : "100" 
	});*/
	
	
	
	//TYPEAHEAD
	
	
	$('#profile-settings-image-input').typeahead({

			
			source: function (query, process) {
				//console.log("source")
				
			    cards = [];
			    map = {};
					
					var setList = ["GTC", "RTR", "M13", "ISD", "AVR", "DKA"];
					
					var setData;
					var cardData;
			    var data = [ ];
					
					$.each( setList, function ( i, setID ) {
						
						setData = SetController.getSet(setID);
						cardData = setData.card_data;
					
						$.each( cardData, function( index, value ) {
								var cardObj = { cardName : value.name, multiverse : value.multiverse };
								data.push( cardObj );
						} );
						
					} );
					
 
			    $.each( data, function (key, cardObj) {
			        map[ cardObj.cardName ] = cardObj;
			        cards.push( cardObj.cardName );
			    } );
 
			    process(cards);
			}
			
			, updater: function (item) {
				
				//console.log('Typeahead updater');
				$('#profile-settings-image-input').tooltip('hide');
				
				var multiverse = map[item].multiverse;
				$('.typeahead').attr('data-multiverse', multiverse);
				var multiverseURL = "url('http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + multiverse + "&type=card')";
				//console.log(multiverseURL);
			
				var target = $('#profile-settings-thumbnail-wrapper');
			
				var targetH = target.height();
			
				if (targetH > 0) {
					console.log('#profile-settings-thumbnail open');
					target.animate({
						'opacity' : 0 
					}
					,200
					,function(){
						$('#profile-settings-thumbnail').css('background-image', multiverseURL);
						target.animate({
							'opacity' : 1
						});
					});
				} else {
					$('#profile-settings-thumbnail').css('background-image', multiverseURL);
					target.animate( {
						height : '201px'
					}
					, 600
					, function() {
				
						console.log('animate callback');
						target.animate( {
							'opacity' : '1'
						}
						, 400
						, function() {
					
							console.log('animate callback 2');
					
						} );
				
					} );
				}
				
				return item;
	    }
		
	});
	
	
	
	
});