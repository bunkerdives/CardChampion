//var i =0;

function lightboxSize() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	$('#nickname-lightbox').css({
		"height": windowHeight,
		"width": windowWidth
	});
}

//var interval = self.setInterval(appendChat,500);
function appendChat() {
	var convo = $("#convo");
	var convoInner = $("#convo-inner"); 
	var atBottom = ( convoInner.outerHeight() - convo.scrollTop() ) <=  convo.height();
	var msg = "<div class='chat-msg'><span class='chat-username' style='color:red;'>Username 1:</span><span>Test" + i + "</span></div>";
	convoInner.append(msg);
	
	if( atBottom ){
		convo.stop().animate({ scrollTop: convo[0].scrollHeight }, 400);
	}

	//++i;
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
