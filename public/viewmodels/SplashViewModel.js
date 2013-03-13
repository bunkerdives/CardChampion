var SplashViewModel = function() {
    
    this.showFoyer = function(layout){
        window.location.href = '/foyer';
    };
    
};


ko.utils.extend( SplashViewModel.prototype, {
    
    init: function() {
        console.log("SplashViewModel init!");
        $("#title").html('LimitedMTG');
		splashLayout();
		$("#imac-screenshot-1").fadeIn(1000);
    }
    
} ); 