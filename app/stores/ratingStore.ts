import {Injectable} from 'angular2/angular2';
import Rating = require('../models/rating');
import AppDispatcher = require ('../dispatcher/appDispatcher');
import EventEmitter = require('wolfy87-eventemitter');
import RatingActionType = require('../actions/ratingActionType');

@Injectable()
class RatingStore extends EventEmitter {
    
    private get changeEvent(): string {
        return "CHANGE";
    }
    private get errorEvent(): string {
        return "ERROR";
    }
    
    private _ratings: Rating[];
    private _dispatcher: AppDispatcher;
    
    dispatcherToken: string;
    
    constructor(dispatcher: AppDispatcher) {        
        this._dispatcher = dispatcher;
        this._ratings = [];
        
        this.dispatcherToken = this._dispatcher.register((payload) => {
            this.handleAction(payload);
        });
        
        super();
    }
    
    getAll(): Rating[]{
        return this._ratings;        
    }
    
    addChangeListener(callback: (data: any) => void) {
        this.addListener(this.changeEvent, callback)
    }
    
    removeChangeListener(callback: (data: any) => void){
        this.removeListener(this.changeEvent, callback);
    }
    
    addErrorListener(callback: (errorMessage: string) => void) {
        this.addListener(this.errorEvent, callback)
    }
    
    removeErrorListener(callback: (errorMessage: string) => void) {
        this.removeListener(this.errorEvent, callback);
    }
    
    private handleAction(payload: any) {
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
    
    private createRating(rating: Rating) {
        this._ratings.push(rating);
        this.emitChange();
    }
    
    private updateRating(rating: Rating) {
        let ratingToUpdate = this._ratings.find((ratingToFind) => {
            return ratingToFind.id == rating.id;
        });
        
        if(ratingToUpdate){
            ratingToUpdate = rating;
            this.emitChange();
        }        
    }
    
    private deleteRating(rating: Rating) {
        var indexToDelete = this._ratings.findIndex((ratingToFind) => {
            return ratingToFind.id == rating.id;
        });        
        
        this._ratings.splice(indexToDelete, 1);  
        console.log('eh');    
    }
    
    private ratingsRecieved(ratings: Rating[]) {
        this._ratings = ratings;
        this.emitChange();        
    }
    
    private emitChange() {
        this.emit(this.changeEvent);
    }
    
    private emitError(errorMessage: string) {
        this.emit(this.errorEvent, errorMessage);
    }  
}

export = RatingStore;