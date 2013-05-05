var FoyerViewController = {
	
	profileLayout : function() {
    
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
			headerInit();
		}
		FoyerViewController.profileLayout();
		FoyerViewController.cardPreviewEvent();
		$('.foyer-header').removeClass('translucent-header');

	}
	
}