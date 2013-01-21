function collapse() {
	$('#open').css({
		"display" : "none",
	});
	$('#closed').css({
		"display" : "block",
	});
	$('#content').css({
		"padding-top" : "20px",
	});
	resizeScreen();
}

function expand() {
	$('#closed').css({
		"display" : "none",
	});
	$('#open').css({
		"display" : "block",
	});
	$('#content').css({
		"padding-top" : "50px",
	});
	resizeScreen();
}