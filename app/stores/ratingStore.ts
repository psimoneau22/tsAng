import {Injectable} from 'angular2/angular2';
import Rating = require('../models/rating');
import AppDispatcher = require ('../dispatcher/appDispatcher');
import RatingService = require('../services/ratingService');
import EventEmitter = require('wolfy87-eventemitter');
import RatingActions = require('../actions/ratingActions');
import RatingActionType = require('../actions/ratingActionType');

@Injectable()
class RatingStore extends EventEmitter {
    
    private get changeEvent(): string {
        return "CHANGE";
    }
    private get errorEvent(): string {
        return "Error";
    }
    
    private _ratings: Rating[];
    private _dispatcher: AppDispatcher;
    private _ratingService: RatingService;
    private _ratingActions: RatingActions;
    dispatcherToken: string;
    
    constructor(dispatcher: AppDispatcher, ratingService: RatingService, ratingActions: RatingActions) {        
        this._dispatcher = dispatcher;
        this._ratingService = ratingService;
        this._ratingActions = ratingActions;
        this._ratings = [];
        
        this.dispatcherToken = dispatcher.register((payload) => {
            
            switch(payload.action.actionType) {
                case RatingActionType.Create : 
                    this.createRating(payload.action.rating);
                    break;
                case RatingActionType.GetAll : 
                    this.getRatings();
                    break;
                case RatingActionType.Error : 
                    this.emitError(payload.action.message)
                    break;
            }
        });
        
        super();
    }
    
    private createRating(rating: Rating){
        this._ratingService.add(rating).then((result) => {
            this._ratings.push(result);
            this.emitChange();
        }, (error) => {
            this._ratingActions.error(error);
        });
    }
    
    private getRatings(){
        this._ratingService.query().then((ratings) => {
            this._ratings = ratings;
            this.emitChange();
        }, (error) => {
            this._ratingActions.error(error);
        }).catch((error) => {
            this._ratingActions.error(error);
        })
    }
    
    getAll(): Rating[]{
        return this._ratings;        
    }
    
    emitChange(){
        this.emit(this.changeEvent);
    }
    
    emitError(errorMessage: string){
        this.emit(this.errorEvent, errorMessage);
    }
    
    addChangeListener(callback){
        this.addListener(this.changeEvent, callback)
    }
    
    removeChangeListener(callback){
        this.removeListener(this.changeEvent, callback);
    }
    
    addErrorListener(callback: (errorMessage: string) => void) {
        this.addListener(this.errorEvent, callback)
    }
    
    removeErrorListener(callback: (errorMessage: string) => void){
        this.removeListener(this.errorEvent, callback);
    }  
}

export = RatingStore;