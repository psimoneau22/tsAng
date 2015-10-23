define(function(require) {
	
	var AppDispatcher = function(){ };
	
	AppDispatcher.prototype.handleViewAction = function(action) {
		
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});		
	};
	
	return AppDispatcher;
});