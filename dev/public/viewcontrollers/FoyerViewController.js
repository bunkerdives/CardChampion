var FoyerViewController = {
	
	showCustomSealedForm : function() {
	
		var $menuRight = $('#sealed-menu-right');
		var $menuLeft = $('#sealed-menu-left');
		var $startBtn = $('#sealed-start-btn');
		var $selectBtn = $('#sealed-select-btn');
		var $customBtn = $('#sealed-custom-btn');
		var $backBtn = $('#sealed-back-btn');
		
		var transparent =  { opacity : 0 };
		var visible = { opacity : 1 };
		
		var shortDuration = 250;
		var mediumDuration = 300;
		var longDuration = 500;
		
		$startBtn.stop().animate(
			transparent
			, shortDuration
			, 'linear'
			, function() {
				$startBtn.hide();
				$selectBtn.show().stop().animate( visible, shortDuration, 'linear' );
			}
		);
		
		$customBtn.stop().animate(
			transparent
			, shortDuration
			, 'linear'
			, function() {
				$customBtn.hide();
				$backBtn.show().stop().animate( visible, shortDuration, 'linear' );
			}
		);
		
		$menuLeft.stop().animate(
			{ 'margin-left' : 0 }
			, longDuration
			, function() {
				$menuLeft.css('margin-right', 0).addClass('pull-left');
				$menuRight.css('width', '50%').stop().animate( visible, mediumDuration, 'linear' );
			}
		);
		
	}

	, hideCustomSealedForm : function() {
	
		var $menuRight = $('#sealed-menu-right');
		var $menuLeft = $('#sealed-menu-left');
		var $menuInner = $('#sealed-menu-inner');
		var $startBtn = $('#sealed-start-btn');
		var $selectBtn = $('#sealed-select-btn');
		var $customBtn = $('#sealed-custom-btn');
		var $backBtn = $('#sealed-back-btn');
		
		var transparent =  { 'opacity' : '0' };
		var visible = { 'opacity' : '1' };
		
		var shortDuration = 250;
		var mediumDuration = 300;
		var longDuration = 500;
	
		$menuRight.stop().animate(
			transparent
			, mediumDuration
			, 'linear'
			, function() {
				
				$selectBtn.stop().animate(
					transparent
					, shortDuration
					, 'linear'
					, function() {
						$selectBtn.hide();
						$startBtn.show().stop().animate( visible, shortDuration, 'linear' );
					}
				);
	
				$backBtn.stop().animate(
					transparent
					, shortDuration
					, 'linear'
					, function() {
						$backBtn.hide();
						$customBtn.show().stop().animate( visible, shortDuration, 'linear' );
					}
				);
			
				$menuRight.css('width', '0%');
				var margin = ( $menuInner.width() - $menuLeft.width() ) / 2;
				
				$menuLeft.removeClass('pull-left').stop().animate(
					{ 'margin-left' : margin + 'px', 'margin-right' : margin + 'px' }
					, longDuration
					, 'linear'
				);
		
			}
		);
		
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
	  	} );
	}


	, showPreviewCard : function( image ) {
		$('#card-preview-container').css( 'background-image', image );
		$('#card-preview-container').css( 'display', 'block' );
		$('#card-preview-container').stop().animate( { opacity : 1 }, 300 );
		FoyerViewController.positionPreviewCard();
		$('body').mousemove( FoyerViewController.positionPreviewCard );
	}

	, hidePreviewCard : function() {
		$cardPreviewContainer = $('#card-preview-container');
		$cardPreviewContainer.stop().animate(
			{ opacity : 0 }
			, 300
			, function() {
				$cardPreviewContainer.css('display', 'none');
				$('body').off('mousemove');
			}
		);
		
	}

	, cardPreviewEvent : function() {
		var $target = $('.deck-view-section a');
		$target.mouseenter( function() {
			FoyerViewController.showPreviewCard( $(this).attr("data-img") );
		} );
		$target.mouseleave( FoyerViewController.hidePreviewCard );
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

		if( $("#header").css("display") == "none" ) {
			//Show header on foyer init
			$("#header").css("display", "block");
			HeaderViewController.headerLayout();
		}
		
		FoyerViewController.profileLayout();
		ThumbnailViewController.renderThumbnail( 75, '.deck-preview-img' );
		FoyerViewController.cardPreviewEvent();
		$('.foyer-header').removeClass('translucent-header');

	}
	
}