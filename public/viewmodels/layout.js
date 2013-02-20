
var View = function( name ) {
    this.templateName = name;
};

var Tab = function(template, title) {
    this.template = template;
    this.title = title;
    this.state = null;
}

var LayoutViewModel = function() {
    
    this.splashVM = SplashViewModel;
    this.foyerSetListVM = FoyerSetListViewModel;
    
    this.tabs = ko.observableArray( [
        new Tab("sealed", "Sealed")
    ] );
    
    this.views = ko.observableArray( [
        new View("splash")
        , new View("foyer")
    ] );
    
    this.selectedView = ko.observable("splash");
    this.header = ko.observable("header");
    this.splashView = ko.observable("splash");
    this.foyer = ko.observable("foyer");
    
};

ko.applyBindings( new LayoutViewModel() );