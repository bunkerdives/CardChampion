var FoyerViewController = {
	
	showCustomSealedForm : function () {
	
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

	, hideCustomSealedForm : function () {
	
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
	
	, profileLayout : function() {
    
		var contentW = $('#main-animate-wrapper').width();
		var leftColW = (contentW-20)*0.35;
	
		var target = '#profile-image';
		ThumbnailViewController.renderThumbnail(leftColW,target);
	
		var deckImgH = 174.812;
		var deckImgW = deckImgH * 0.71935;
		var deckImgTop = deckImgH * -0.1258;
		var deckImgLeft = deckImgW * -0.15;
		$('.deck-preview-img').css({
			'background-size': deckImgW + "px " + deckImgH + "px",
			'background-position': deckImgLeft + "px " + deckImgTop + "px"
		});
	
		ThumbnailViewController.renderThumbnail(67,'#deck-view-thumbnail');
	}
	
	, positionPreviewCard : function() {
		
		$('#card-preview-container').css( {
	  	'top' : event.pageY - 20
	  	, 'left' : event.pageX + 20
	  });
	  
	}


	, showPreviewCard : function(target,c) {
	
		$('#card-preview-container').css("background-image", target);
		$('#card-preview-container').css('display', 'block');
		$('#card-preview-container').stop().animate({ opacity: 1 }, 300);
 
		FoyerViewController.positionPreviewCard();
		$('body').mousemove(function(){
			FoyerViewController.positionPreviewCard();
		});
	
	}

	, hidePreviewCard : function() {
		
		$('#card-preview-container').stop().animate({ opacity: 0 }, 300, function(){
			$('#card-preview-container').css('display', 'none');
			$('body').off('mousemove');
		});
		
	}

	, cardPreviewEvent : function() {
	
		$('.deck-view-section a').mouseenter(function() {
			FoyerViewController.showPreviewCard( $(this).attr("data-img"), false );
		}).mouseleave(function(){
			FoyerViewController.hidePreviewCard();
		});
	
	}
	
	, showChatUserlist : function() {
		$('#chat').toggle();
		$('#userlist').toggle();
		$('#chat-msg').toggle();
		$('#chat-send-btn').toggle();
		$('#chat-user-total').toggle();
		$('#userlist-toggle-btn i').toggleClass('icon-user');
		$('#userlist-toggle-btn i').toggleClass('icon-comment');
	}
	
	, foyerInit : function(){ 

		var headerExists = $("#header").css("display");
		if (headerExists=="none"){
			$("#header").css("display", "block");//Show header on foyer init
			HeaderViewController.headerLayout();
		}
		FoyerViewController.profileLayout();
		ThumbnailViewController.renderThumbnail(50,'.deck-preview-img');
		FoyerViewController.cardPreviewEvent();
		$('.foyer-header').removeClass('translucent-header');

	}
	
}