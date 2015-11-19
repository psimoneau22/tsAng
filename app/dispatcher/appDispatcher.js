define(function(require) {
	
	var Dispatcher = require("flux").Dispatcher;
	
	var AppDispatcher = ng.Class({
		constructor: function(){ 
			
		},
		extends: Dispatcher
	});
	
	AppDispatcher.prototype.handleViewAction = function(action) {
		
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});		
	};
	
	return AppDispatcher;
});