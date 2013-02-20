ko.plugin = function( configuration ) {
    
    var self = this;
    
    self.template = configuration.template || '';
    self.context = configuration.context || '';
    
};

ko.bindingHandlers.plugin = {
    update: function(element, valueAccessor, allBindingsAccessor) {
        var viewModel = valueAccessor();

        $(element).html('<div id="templateContainer"></div>');
        var $container = $(element).children('#templateContainer');
        
        //ko.renderTemplate( viewModel.template, viewModel, {}, $container, 'replaceNode' );
        ko.renderTemplate( viewModel.template, viewModel.context, {
        	afterRender: function(renderedElement){
        		viewModel.context.init();
        	}
        }, $container, 'replaceNode' );
		}
};

var vm = function() {
    
    this.plugin = new ko.plugin( { template : "splash", context : new SplashViewModel() } );
    
    //this.foyer = ko.observable();
    
}

ko.applyBindings( new vm() );


/*
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
    
    this.selectedView = ko.observable("splash");
    this.header = ko.observable("header");
    this.splashView = ko.observable("splash");
    this.foyer = ko.observable("foyer");
    
    this.views = ko.observableArray( [
        new View("splash")
        , new View("foyer")
    ] );
    
};

ko.applyBindings( new LayoutViewModel() );
*/