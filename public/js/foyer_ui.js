function showChat() {
	$('#chat-hidden').css("display", "none");
	$('#screenshot-carousel').css("display", "none");
	$('#chat-shown').css("display", "block");
}


$(document).ready(function(){
  $('#screenshot-carousel').carousel({
		interval: 5000
	});
});