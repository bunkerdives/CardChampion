//Pick screen height
//onLoad of last card in pack screen
$(document).ready(function(){
	$('#pack-row2-loaded').load(function(){
		var fixed_height = 0
	  fixed_height = $('#pack-screen').height()
		fixed_height = fixed_height + 15 //i.e., padding
		$("#pick-screen").css({
		  "padding-top":fixed_height + "px"
		});
	});
});

//onResize of window
$(window).resize(function() {
	var fixed_height = 0
  fixed_height = $('#pack-screen').height()
	fixed_height = fixed_height + 15 //i.e., padding
	$("#pick-screen").css({
	  "padding-top":fixed_height + "px"
	});
});

//Background image (i.e., card) size
//onLoad first row of pack
$(document).ready(function(){
	$('#pack-row1-loaded').load(function(){
		var fixed_height = 0
		var fixed_width = 0
	  fixed_height = $('#pack-row1-loaded').height()
		fixed_width = $('#pack-row1-loaded').width()
		function loop(n) {
			if(n > 0)
			{
				$("#pack-card-" + n).css({
		  		"background-size": fixed_width + "px " + fixed_height + "px"
				}, loop(n-1));
			}
		}
		loop(16);
	});
});

//onResize of window
$(window).resize(function() {
	var fixed_height = 0
	var fixed_width = 0
  fixed_height = $('#pack-row1-loaded').height()
	fixed_width = $('#pack-row1-loaded').width()
	function loop(n) {
		if(n > 0)
		{
			$("#pack-card-" + n).css({
	  		"background-size": fixed_width + "px " + fixed_height + "px"
			}, loop(n-1));
		}
	}
	loop(16);
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
$(window).resize(function() {
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