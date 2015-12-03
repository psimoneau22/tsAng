define(function(require){
	
	var RatingActionType = require("app/actions/ratingActionType");
	
	var RatingActions = ng.Class({
		constructor: [ng.Inject("AppDispatcher"), ng.Inject("RatingService"), ng.Inject("AppConfig"), 
			function(dispatcher, ratingService, config){
				this._dispatcher = dispatcher;
				this._ratingService = ratingService;
				this._config = Object.assign({ useLiveUpdates: false}, config);
			}
		]			
	});
	
	RatingActions.prototype.create = function(rating){
		this._ratingService.add(rating).then(function(result) {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Create,
						rating: result
					});
				}
			}.bind(this), function(error) {
				this.error(error);
        	}.bind(this)
		).catch(function(reason) {
			this.error(reason);	
		}.bind(this));
	}
	
	RatingActions.prototype.update = function(rating){
		this._ratingService.update(rating).then(function(result) {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Update,
						rating: result
					});
				}
			}.bind(this), function(error) {
				this.error(error);
        	}.bind(this)
		).catch(function(reason) {
			this.error(reason);	
		}.bind(this));
	}
	
	RatingActions.prototype.delete = function(rating){
		
		this._ratingService.remove(rating).then(function(result) {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Delete,
						rating: result
					});
				}
			}.bind(this), function(error) {
				this.error(error);
        	}.bind(this)
		).catch(function(reason) {
			this.error(reason);	
		}.bind(this));	
	}
	
	RatingActions.prototype.getAll = function(rating){
		if(!this._config.useLiveUpdates) {	
			this._ratingService.query().then(function(result) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.RecievedAll,
						ratings: result
					});
				}.bind(this), function(error) {
					this.error(error);
				}.bind(this)
			).catch(function(reason) {
				this.error(reason);	
			}.bind(this));
		}
	}
	
	RatingActions.prototype.subscribe = function() {
		
		this._ratingService.subscribe(function(result) {
			this._dispatcher.handleViewAction({
				actionType: RatingActionType.RecievedAll,
				ratings: result
			});
		}.bind(this));
	}
	
	RatingActions.prototype.unsubscribe = function(){
		this._ratingService.unsubscribe();
	}
	
	RatingActions.prototype.initApp = function(){
		if(this._config.useLiveUpdates){
            this.subscribe();
        }
        else {
            this.getAll();
        }
	}
	
	RatingActions.prototype.destroyApp = function(){
		if(this._config.useLiveUpdates){
            this.unsubscribe();
        }
	}
		
	RatingActions.prototype.error = function(errorMessage){
		this._dispatcher.handleViewAction({
			actionType: RatingActionType.Error,
			message: errorMessage
		});
	}
	
	return RatingActions;
});