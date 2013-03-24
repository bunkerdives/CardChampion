ko.plugin = function( configuration ) {
    this.template = configuration.template || '';
    this.context = configuration.context || '';
};

ko.bindingHandlers.plugin = {
    
    update: function( element, valueAccessor, allBindingsAccessor ) {

        console.log("TemplatePlugin update")
        element = $(element);
        element.html('<div id="templateContainer"></div>');

        var viewModel = valueAccessor();
        console.log("viewModel.template = " + viewModel.template)
        ko.renderTemplate( viewModel.template, viewModel.context, {
        	afterRender: function(renderedElement){
                console.log("afterRender")
        		viewModel.context.init();
        	}
        }, element.children('#templateContainer'), 'replaceNode' );
        
	}
    
};