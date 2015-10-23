// import { Component, FORM_DIRECTIVES, CORE_DIRECTIVES } from 'angular2/angular2';
// import Rating = require('../../models/rating');
// import RatingActions = require('../../actions/ratingActions');
// import * as http from 'angular2/http'
// 
// @Component({
//     selector: 'rating-form',
// 	directives: [FORM_DIRECTIVES], 
//     templateUrl: 'app/components/templates/ratingForm.html'
// })
define(function(require) {
	
	var Rating = require("../../models/rating");
	
	var RatingForm = function(ratingActions){
		this.model = new Rating();
		this.ratingActions = ratingActions;
	}
		
	RatingForm.prototype.getModelJson = function(){
		return JSON.stringify(this.model);
	}
	
	RatingForm.prototype.add = function(){
		this.ratingActions.create(this.model);
		this.model = new Rating();
	}
	
	return RatingForm;
});