var SplashViewModel = function() {
    
    this.showFoyer = function(layout){
        window.location.href = '/decks';
    };
    
};


ko.utils.extend( SplashViewModel.prototype, {
    
    init: function() {
        $("#authlightbox").css('display','none');
        console.log("SplashViewModel init!");
        $("#title").html('LimitedMTG');
		splashInit();
		$("#imac-screenshot-1").fadeIn(1000);
    }
    
} ); 