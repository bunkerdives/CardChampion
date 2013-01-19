//Pick screen top padding
	//onLoad of last card in pack screen
$(document).ready(function(){
	$('#pack-tran-16').load(function(){
	  fixed_height = $('#pack-screen').height();
		fixed_height = fixed_height + 15; //i.e., padding
		$("#pick-screen").css({
		  "padding-top" : fixed_height + "px"
		});
	});
});

	//onResize of window
$(window).resize(function() {
  fixed_height = $('#pack-screen').height();
	fixed_height = fixed_height + 15; //i.e., padding
	$("#pick-screen").css({
	  "padding-top" : fixed_height + "px"
	});
});

//Background image (i.e., card) size of pack screen
	//Pack cards
		//onLoad first row of pack
$(document).ready(function(){
	$('#pack-tran-8').load(function(){
	  fixed_height = $('#pack-tran-8').height();
		fixed_width = $('#pack-tran-8').width();
		for( var i = 0; i < 16; ++i ){
			var id = "#pack-card-" + i;
			$(id).css({
		  	"background-size": fixed_width + "px " + fixed_height + "px"
			});
		}
	});
});

		//onResize of window
$(window).resize(function() {
  fixed_height = $('#pack-tran-8').height()
	fixed_width = $('#pack-tran-8').width()
	for( var i = 0; i < 16; ++i ){
		var id = "#pack-card-" + i;
		$(id).css({
	  	"background-size": fixed_width + "px " + fixed_height + "px"
		});
	}
});

	//Preview
		//onLoad
$(document).ready(function(){
	$('#pack-tran-8').load(function(){
		var id = "#preview";
	  var fixed_height = $(id).height();
		var fixed_width = $(id).width();
		$(id).css({
		  "background-size": fixed_width + "px " + fixed_height + "px"
		});
	});
});

		//onResize of window
$(window).resize(function() {
	var id = "#preview";
  fixed_height = $(id).height()
	fixed_width = $(id).width()
	$(id).css({
	  "background-size": fixed_width + "px " + fixed_height + "px"
	});
});

//Background image (i.e., card) size of pick screen
	//onLoad first row of picks
$(document).ready(function(){
	$('#pick-row-loaded').load(function(){
		var fixed_height = 0
		var fixed_width = 0
	  fixed_height = $('#pick-row-loaded').height()
		fixed_width = $('#pick-row-loaded').width()
		var i = 0 //i.e., row#, 0=1
		
		//-0(row)-0(column)
		function loopRow(r) {
			if(r <= i)
			{
				
				function loopCol(c) {
					if(c <= 9)
					{
						$("#pick-card-" + r + "-" + c).css({
				  		"background-size": fixed_width + "px " + fixed_height + "px"
						}, loopCol(c+1));
					}
					loopRow(r+1)
				}
				loopCol(0);
			}
		}
		loopRow(0);
	});
});

	//onResize of window
//$(window).resize(function() {
//	var fixed_height = 0
//	var fixed_width = 0
//  fixed_height = $('#pick-row-loaded').height()
//	fixed_width = $('#pick-row-loaded').width()
//	var i = 44 //i.e., row#, 0=1
//	//-0(row)-0(column)
//	function loopRow(r) {
//		if(r <= i)
//		{
				
//			function loopCol(c) {
//				if(c <= 9)
//				{
//					$("#pick-card-" + r + "-" + c).css({
//			  		"background-size": fixed_width + "px " + fixed_height + "px"
//					}, loopCol(c+1));
//				}
//				loopRow(r+1)
//			}
//			loopCol(0);
//		}
//	}
//	loopRow(0);
//});