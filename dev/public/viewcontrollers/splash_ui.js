function iMacLayout(){
	var iMacW = $('#imac-wrapper').width();
	var iMacH = iMacW * 0.76625; //H-W ratio of iMac
	var screenshotW = iMacW * 0.92125; //screen W-iMac W ratio 
	var screenshotH = screenshotW * 0.562432; //screen H-iMac H ratio
	var screenshotTop = iMacH * -0.946982; //negative margin top
	$('#imac-screenshot-wrapper').css( {
		'width' : screenshotW
		, 'height' : screenshotH
		, 'margin-top' : screenshotTop
	} );
}

function splashInit() {
	iMacLayout();
}

$(window).resize( function() {
    // if the splash element is showing, setup its layout
	if( $('#splash').length == 1 ) {
		splashLayout();
	}
} );


var cards = [];
var map = {};

$(document).ready( function() {
	$(document).off('touchstart.dropdown.data-api');
} );