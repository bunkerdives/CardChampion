var ResizeViewController = {
	
	templateCases : {
		'Foyer' : function() { ResizeViewController.foyerResize() }
		, 'Builder' : function() { ResizeViewController.builderResize() }
		, 'Sealed' : function() { ResizeViewController.sealedResize() }
	}
	
	, templateSwitch : function() {
		
		var currentTemplate = this.templateCases[ ViewModel.viewName ];
		
		if( currentTemplate ) { 
			currentTemplate();
		} else {
			console.log('Error: Template name not recognized by ResizeViewController.templateSwitch().');
		}
		
		if( currentTemplate != 'Splash' ) {
			BackgroundController.setBackgroundImage();
		}
		
		// TODO Create HeaderViewController
		var headerExists = $("#header").css("display");
		if (headerExists=="block") {
			HeaderViewController.headerLayout();
		}
		
		if( LightboxController.isVisible ) {
			LightboxController.positionLightbox();
		}
		
	}
	
	, foyerResize : function() {
		FoyerViewController.profileLayout();
	}
	
	, builderResize : function() {
		BuilderViewController.builderLayout();
	}
	
	, sealedResize : function() {
		LimitedViewController.limitedLayout();
	}
	
}

$(window).resize( function(){
	ResizeViewController.templateSwitch();
} );