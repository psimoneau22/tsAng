import { Component, FORM_DIRECTIVES, CORE_DIRECTIVES } from 'angular2/angular2';
import Rating = require('../../models/rating');
import RatingActions = require('../../actions/ratingActions');
import * as http from 'angular2/http'

@Component({
    selector: 'rating-form',
	directives: [FORM_DIRECTIVES], 
    templateUrl: 'app/components/templates/ratingForm.html'
})
class RatingForm {
	
	model: Rating;
	ratingActions: RatingActions;
	
	constructor(ratingActions: RatingActions){
		this.model = new Rating();
		this.ratingActions = ratingActions;
	}
		
	getModelJson(){
		return JSON.stringify(this.model);
	}
	
	add(){
		this.ratingActions.create(this.model);
		this.model = new Rating();
	}
}

export = RatingForm;