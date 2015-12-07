define(function(require){
	
	var RatingActionType = require("app/actions/ratingActionType");
	
	var RatingActions = ng.Class({
		constructor: [ng.Inject("AppDispatcher"), ng.Inject("RatingService"), ng.Inject("AppConfig"), 
			function(dispatcher, ratingService, config){
				this._dispatcher = dispatcher;
				this._ratingService = ratingService;
				this._config = config;
			}
		]			
	});
	
	RatingActions.prototype.create = function(rating){
		var self = this;
		
		this._ratingService.add(rating).then(function(result) {
				self._dispatcher.handleViewAction({
					actionType: RatingActionType.Create,
					rating: result
				});				
			}, function(error) {
				self.error(error);
        	}
		).catch(function(reason) {
			self.error(reason);	
		});
	}
	
	RatingActions.prototype.update = function(rating){
		var self = this;
		
		this._ratingService.update(rating).then(function(result) {				
				self._dispatcher.handleViewAction({
					actionType: RatingActionType.Update,
					rating: result
				});				
			}, function(error) {
				self.error(error);
        	}
		).catch(function(reason) {
			self.error(reason);	
		});
	}
	
	RatingActions.prototype.delete = function(rating){
		var self = this;
		
		this._ratingService.remove(rating).then(function(result) {				
				self._dispatcher.handleViewAction({
					actionType: RatingActionType.Delete,
					rating: result
				});				
			}, function(error) {
				self.error(error);
        	}
		).catch(function(reason) {
			self.error(reason);	
		});	
	}
	
	RatingActions.prototype.getAll = function(){
		var self = this;
		
		this._ratingService.query().then(function(result) {
				self._dispatcher.handleViewAction({
					actionType: RatingActionType.RecievedAll,
					ratings: result
				});
			}, function(error) {
				self.error(error);
			}
		).catch(function(reason) {
			self.error(reason);	
		});		
	}
	
	RatingActions.prototype.initApp = function(){		
		this.getAll();
	}
	
	RatingActions.prototype.destroyApp = function(){
		
	}
		
	RatingActions.prototype.error = function(errorMessage){
		this._dispatcher.handleViewAction({
			actionType: RatingActionType.Error,
			message: errorMessage
		});
	}
	
	return RatingActions;
});