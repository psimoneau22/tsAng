import {Inject} from 'angular2/angular2';
import AppDispatcher = require('../dispatcher/appDispatcher');
import Rating = require('../models/rating');
import RatingActionType = require('../actions/ratingActionType');

@Inject(AppDispatcher)
class RatingActions {
	
	private _dispatcher: AppDispatcher;
	
	constructor(dispatcher: AppDispatcher){
		this._dispatcher = dispatcher;
	}
	
	create(rating: Rating){
		this._dispatcher.handleViewAction({
			actionType: RatingActionType.Create,
			rating: rating
		});
	}
	
	getAll(){
		this._dispatcher.handleViewAction({
			actionType: RatingActionType.GetAll
		});
	}
	
	error(errorMessage: string){
		this._dispatcher.handleViewAction({
			actionType: RatingActionType.Error,
			message: errorMessage
		});
	}
}

export = RatingActions
