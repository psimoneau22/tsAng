define(function(require) {
	
	var Dispatcher = require("flux").Dispatcher;
	
	var AppDispatcher = function(){ };     
    AppDispatcher.prototype = new Dispatcher();
    AppDispatcher.prototype.constructor = AppDispatcher;
	
	AppDispatcher.prototype.handleViewAction = function(action) {
		
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});		
	};
	
	return AppDispatcher;
});