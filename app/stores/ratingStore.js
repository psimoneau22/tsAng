define(function(require) {
    
    var RatingActionType = require('app/actions/ratingActionType');
    var EventEmitter = require("eventemitter");
    
    var RatingStore = ng.Class({        
        extends: EventEmitter,
        constructor: [ng.Inject("AppDispatcher"), function(dispatcher){ 
            this._dispatcher = dispatcher;
            this._ratings = [];
            this.changeEvent = "CHANGE";
            this.errorEvent = "ERROR";
            
            var self = this;
            this.dispatcherToken = this._dispatcher.register(function(payload) {
                self.handleAction(payload);
            });
        }]   
    });
    
    RatingStore.prototype.getAll = function() {
        return this._ratings;        
    };
    
    RatingStore.prototype.addChangeListener = function(callback) {
        this.addListener(this.changeEvent, callback)
    };
    
    RatingStore.prototype.removeChangeListener = function(callback){
        this.removeListener(this.changeEvent, callback);
    };
    
    RatingStore.prototype.addErrorListener = function(callback) {
        this.addListener(this.errorEvent, callback)
    };
    
    RatingStore.prototype.removeErrorListener = function(callback) {
        this.removeListener(this.errorEvent, callback);
    };
    
    RatingStore.prototype.handleAction = function(payload) {
        switch(payload.action.actionType) {
            case RatingActionType.Create : 
                this.createRating(payload.action.rating);
                break;
            case RatingActionType.Update : 
                this.updateRating(payload.action.rating);
                break;                
            case RatingActionType.Delete : 
                this.deleteRating(payload.action.rating)
                break;
            case RatingActionType.RecievedAll : 
                this.ratingsRecieved(payload.action.ratings);
                break;
            case RatingActionType.Error : 
                this.emitError(payload.action.message)
                break;
        }
    };
    
    RatingStore.prototype.createRating = function(rating) {
        this._ratings.push(rating);
        this.emitChange();
    };
    
    RatingStore.prototype.updateRating = function(rating) {
        var ratingToUpdate = this._ratings.find(function(ratingToFind) {
            return ratingToFind.id == rating.id;
        });
        
        if(ratingToUpdate){
            ratingToUpdate = rating;
            this.emitChange();
        }        
    };
    
    RatingStore.prototype.deleteRating = function(rating) {
        var indexToDelete = this._ratings.findIndex(function(ratingToFind) {
            return ratingToFind.id == rating.id;
        });        
        
        this._ratings.splice(indexToDelete, 1); 
    };
    
    RatingStore.prototype.ratingsRecieved = function(ratings) {
        this._ratings = ratings;
        this.emitChange();        
    };
    
    RatingStore.prototype.emitChange = function() {
        this.emit(this.changeEvent);
    };
    
    RatingStore.prototype.emitError = function(errorMessage) {
        this.emit(this.errorEvent, errorMessage);
    };
    
    return RatingStore;  
});