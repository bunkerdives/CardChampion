function iMacLayout(){
	//console.log('iMacLayout function called.');
	var iMacW = $('#imac-wrapper').width();
	//console.log('iMacW: ' + iMacW);
	var iMacH = iMacW * 0.76625;//H-W ratio of iMac
	//console.log('iMacH: ' + iMacH);
	var screenshotW = iMacW * 0.92125;//screen W-iMac W ratio 
	//console.log('screenshotW: ' + screenshotW);
	var screenshotH = screenshotW * 0.562432;//screen H-iMac H ratio
	//console.log('screenshotH: ' + screenshotH);
	var screenshotTop = iMacH * -0.946982;//negative margin top
	//console.log('screenshotTop: ' + screenshotTop);
	$("#imac-screenshot-wrapper").css({
		"width": screenshotW,
		"height": screenshotH,
		"margin-top": screenshotTop
	});
}

function splashLayout() {
	console.log('splashLayout function called.');
	iMacLayout();
}

function splashInit() {
	splashLayout();
}

$(window).resize(function() {
	var splashExists = $("#splash").length;
	if (splashExists==1) {
		splashLayout();
	}
});