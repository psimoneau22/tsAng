// import {Inject, Injectable} from 'angular2/angular2';
// import AppDispatcher = require('../dispatcher/appDispatcher');
// import Rating = require('../models/rating');
// import RatingActionType = require('../actions/ratingActionType');
// import ApiService from '../services/apiService';

define(function(require){
	
	var RatingActionType = require("./ratingActionType");
	
	var RatingActions = function(dispatcher, ratingService, config){
		this._dispatcher = dispatcher;
		this._ratingService = ratingService;
		this._config = Object.assign({ useLiveUpdates: false}, config);
	}
	
	RatingActions.prototype.create = function(rating){
		this._ratingService.add(rating).then(function(result) {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Create,
						rating: result
					});
				}
			}, function(error) {
				this.error(error);
        	}
		).catch(function(reason) {
			this.error(reason);	
		});
	}
	
	RatingActions.prototype.update = function(rating){
		this._ratingService.update(rating).then(function(result) {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Update,
						rating: result
					});
				}
			}, function(error) {
				this.error(error);
        	}
		).catch(function(reason) {
			this.error(reason);	
		});
	}
	
	RatingActions.prototype.delete = function(rating){
		
		this._ratingService.remove(rating).then(function(result) {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Delete,
						rating: result
					});
				}
			}, function(error) {
				this.error(error);
        	}
		).catch(function(reason) {
			this.error(reason);	
		});	
	}
	
	RatingActions.prototype.getAll = function(rating){
		if(!this._config.useLiveUpdates) {	
			this._ratingService.query().then(function(result) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.RecievedAll,
						ratings: result
					});
				}, function(error) {
					this.error(error);
				}
			).catch(function(reason) {
				this.error(reason);	
			});
		}
	}
	
	RatingActions.prototype.subscribe = function(){
		this._ratingService.subscribe(function(result) {
			this._dispatcher.handleViewAction({
				actionType: RatingActionType.RecievedAll,
				ratings: result
			});
		});
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