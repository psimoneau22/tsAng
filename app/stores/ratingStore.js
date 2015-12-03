define(function(require) {
    
    var RatingActionType = require('app/actions/ratingActionType');
    var EventEmitter = require("eventemitter");
    
    var RatingStore = ng.Class({
        constructor: [ng.Inject("AppDispatcher"), function(dispatcher){ 
            this._dispatcher = dispatcher;
            this._ratings = [];
            this.changeEvent = "CHANGE";
            this.errorEvent = "ERROR";
            
            this.dispatcherToken = this._dispatcher.register(function(payload) {
                this.handleAction(payload);
            }.bind(this));
        }],
        
        getAll: function() {
            return this._ratings;        
        },
        
        addChangeListener: function(callback) {
            this.addListener(this.changeEvent, callback)
        },
        
        removeChangeListener: function(callback){
            this.removeListener(this.changeEvent, callback);
        },
        
        addErrorListener: function(callback) {
            this.addListener(this.errorEvent, callback)
        },
        
        removeErrorListener: function(callback) {
            this.removeListener(this.errorEvent, callback);
        },
        
        handleAction: function(payload) {
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
        },
        
        createRating: function(rating) {
            this._ratings.push(rating);
            this.emitChange();
        },
        
        updateRating: function(rating) {
            var ratingToUpdate = this._ratings.find(function(ratingToFind) {
                return ratingToFind.id == rating.id;
            });
            
            if(ratingToUpdate){
                ratingToUpdate = rating;
                this.emitChange();
            }        
        },
        
        deleteRating: function(rating) {
            var indexToDelete = this._ratings.findIndex(function(ratingToFind) {
                return ratingToFind.id == rating.id;
            });        
            
            this._ratings.splice(indexToDelete, 1); 
        },
        
        ratingsRecieved: function(ratings) {
            this._ratings = ratings;
            this.emitChange();        
        },
        
        emitChange: function() {
            this.emit(this.changeEvent);
        },
        
        emitError: function(errorMessage) {
            this.emit(this.errorEvent, errorMessage);
        },
        extends: EventEmitter
    });
    
    return RatingStore;  
});