
define(function(require) {
    
    get changeEvent(): string {
        return "CHANGE";
    }
    get errorEvent(): string {
        return "ERROR";
    }
    
    var RatingStore = function(dispatcher){ 
        this._dispatcher = dispatcher;
        this._ratings = [];
        
        this.dispatcherToken = this._dispatcher.register((payload) => {
            this.handleAction(payload);
        });
        
        super();
    }; 
    
    
    
    RatingStore.prototype.getAll = function() {
        return this._ratings;        
    }
    
    RatingStore.prototype.addChangeListener = function(callback) {
        this.addListener(this.changeEvent, callback)
    }
    
    RatingStore.prototype.removeChangeListener = function(callback){
        this.removeListener(this.changeEvent, callback);
    }
    
    RatingStore.prototype.addErrorListener = function(callback) {
        this.addListener(this.errorEvent, callback)
    }
    
    RatingStore.prototype.removeErrorListener = function(callback) {
        this.removeListener(this.errorEvent, callback);
    }
    
    private handleAction(payload) {
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
    }
    
    private createRating(rating) {
        this._ratings.push(rating);
        this.emitChange();
    }
    
    private updateRating(rating) {
        let ratingToUpdate = this._ratings.find(function(ratingToFind) {
            return ratingToFind.id == rating.id;
        });
        
        if(ratingToUpdate){
            ratingToUpdate = rating;
            this.emitChange();
        }        
    }
    
    private deleteRating(rating) {
        var indexToDelete = this._ratings.findIndex(function(ratingToFind) {
            return ratingToFind.id == rating.id;
        });        
        
        this._ratings.splice(indexToDelete, 1); 
    }
    
    private ratingsRecieved(ratings) {
        this._ratings = ratings;
        this.emitChange();        
    }
    
    private emitChange() {
        this.emit(this.changeEvent);
    }
    
    private emitError(errorMessage) {
        this.emit(this.errorEvent, errorMessage);
    }  
}

export = RatingStore;