//Temporary functions for New Sealed Event subview mockup
function showCustomSealedForm() {
	
	console.log('showCustomSealedForm function called.');
	
	var $menuRight = $('#sealed-menu-right');
	var $menuLeft = $('#sealed-menu-left');
	var $startBtn = $('#sealed-start-btn');
	var $selectBtn = $('#sealed-select-btn');
	var $customBtn = $('#sealed-custom-btn');
	var $backBtn = $('#sealed-back-btn');
	
	$startBtn
		.stop()
		.animate( {
			'opacity' : '0'
		}
		, 250
		, 'linear'
		, function () {
			$startBtn.hide();
			$selectBtn
				.show()
				.stop()
				.animate( {
					'opacity' : '1'
				}
				, 250
				, 'linear' 
			);
		} );
	
	$customBtn
		.stop()
		.animate( {
			'opacity' : '0'
		}
		, 250
		, 'linear'
		, function () {
			$customBtn.hide();
			$backBtn
				.show()
				.stop()
				.animate( {
					'opacity' : '1'
				}
				, 250
				, 'linear'
			);
		} );
	
	$menuLeft
		.stop()
		.animate( {
			'margin-left' : 0
		}
		, 500
		, function() {
			$menuLeft
				.css('margin-right', 0)
				.addClass('pull-left');
			$menuRight
				.css('width', '50%')
				.stop()
				.animate( {
					'opacity' : '1'
				}
				, 300
				, 'linear' );
		} );
}

function hideCustomSealedForm() {
	
	console.log('hideCustomSealedForm function called.');
	
	var $menuRight = $('#sealed-menu-right');
	var $menuLeft = $('#sealed-menu-left');
	var $startBtn = $('#sealed-start-btn');
	var $selectBtn = $('#sealed-select-btn');
	var $customBtn = $('#sealed-custom-btn');
	var $backBtn = $('#sealed-back-btn');
	
	$menuRight
		.stop()
		.animate( {
			'opacity' : '0'
		}
		, 300
		, 'linear'
		, function() {
			
			$selectBtn
				.stop()
				.animate( {
					'opacity' : '0'
				}
				, 250
				, 'linear'
				, function () {
					$selectBtn.hide();
					$startBtn
						.show()
						.stop()
						.animate( {
							'opacity' : '1'
						}
						, 250
						, 'linear' );
				} );
	
			$backBtn
				.stop()
				.animate( {
					'opacity' : '0'
				}
				, 250
				, 'linear'
				, function () {
					$backBtn.hide();
					$customBtn
						.show()
						.stop()
						.animate( {
							'opacity' : '1'
						}
						, 250
						, 'linear' );
				} );
			
			$menuRight.css('width', '0%');
			var margin = ($('#sealed-menu-inner').width()-$('#sealed-menu-left').width())/2;
			console.log(margin)
			$menuLeft
				.removeClass('pull-left')
				.stop()
				.animate( {
					'margin-left' : margin + 'px'
					, 'margin-right' : margin + 'px'
				}
				, 500
				, 'linear' );
		
		} );
}
//End temporary functions

$(document).ready(function($){

	ThumbnailViewController.renderThumbnail(50,'.deck-preview-img');

});