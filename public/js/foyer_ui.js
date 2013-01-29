function lightboxSize() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	$('#nickname-lightbox').css({
		"height": windowHeight,
		"width": windowWidth
	});
}


$(document).ready(function(){
  $('#screenshot-carousel').carousel({
		interval: 5000
	});
	lightboxSize();
});

$(window).resize(function() {
	lightboxSize();
});
