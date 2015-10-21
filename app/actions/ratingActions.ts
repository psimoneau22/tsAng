import {Inject, Injectable} from 'angular2/angular2';
import AppDispatcher = require('../dispatcher/appDispatcher');
import Rating = require('../models/rating');
import RatingActionType = require('../actions/ratingActionType');
import ApiService from '../services/apiService';

@Injectable()
class RatingActions {
	
	private _dispatcher: AppDispatcher;
	private _ratingService: ApiService<Rating>;
	private _config: {useLiveUpdates: boolean};
	
	constructor(dispatcher: AppDispatcher, @Inject("ApiService<Rating>") ratingService: ApiService<Rating>, @Inject("AppConfig") config: {useLiveUpdates: boolean}){
		this._dispatcher = dispatcher;
		this._ratingService = ratingService;
		this._config = Object.assign({ useLiveUpdates: false}, config);
	}
	
	create(rating: Rating) {
			
        // todo: dispatch a message at this point 
		// telling the client we are in the process of creating the item
		// so the view may display a loading bar etc until the message 
		// comes back.  Correlate the two actions with a 
		// timestamp / guid
		
        this._ratingService.add(rating).then(
			(result) => {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Create,
						rating: result
					});
				}
			},
			(error) => {
				this.error(error);
        	}
		).catch((reason) => {
			this.error(reason);	
		});
	}
	
	update(rating: Rating) {
		
		this._ratingService.update(rating).then(
			(result) => {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Update,
						rating: result
					});
				}
			},
			(error) => {
				this.error(error);
        	}
		).catch((reason) => {
			this.error(reason);	
		});
	}
	
	delete(rating: Rating) {
		
		this._ratingService.remove(rating).then(
			(result) => {
				if(!this._config.useLiveUpdates) {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.Delete,
						rating: result
					});
				}
			},
			(error) => {
				this.error(error);
        	}
		).catch((reason) => {
			this.error(reason);	
		});
	}
	
	getAll() { 
		if(!this._config.useLiveUpdates) {	
			this._ratingService.query().then(
				(result) => {
					this._dispatcher.handleViewAction({
						actionType: RatingActionType.RecievedAll,
						ratings: result
					});
				},
				(error) => {
					this.error(error);
				}
			).catch((reason) => {
				this.error(reason);	
			});
		}
	}
	
	subscribe(){
		this._ratingService.subscribe((result) => {
			this._dispatcher.handleViewAction({
				actionType: RatingActionType.RecievedAll,
				ratings: result
			});
		});
	}
	
	unsubscribe(){
		this._ratingService.unsubscribe();
	}
	
	initApp(){
				
        if(this._config.useLiveUpdates){
            this.subscribe();
        }
        else {
            this.getAll();
        }
	}
	
	destroyApp(){
		if(this._config.useLiveUpdates){
            this.unsubscribe();
        }
	}
	
	error(errorMessage: string){
		this._dispatcher.handleViewAction({
			actionType: RatingActionType.Error,
			message: errorMessage
		});
	}
}

export = RatingActions
