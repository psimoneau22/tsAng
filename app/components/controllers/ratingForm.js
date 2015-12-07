define(function(require) {
	
	var Rating = require("app/models/rating");
	
	var RatingForm = ng.Component({
		selector: 'rating-form',
		templateUrl: 'app/components/templates/ratingForm.html',
		directives: [ng.FORM_DIRECTIVES]	
	}).Class({
		constructor: [ng.Inject("RatingActions"),
			function(ratingActions){
				this.model = new Rating();
				this.ratingActions = ratingActions;
			}
		]
	});
		
	RatingForm.prototype.getModelJson = function(){
		return JSON.stringify(this.model);
	};
	
	RatingForm.prototype.add = function(){
		this.ratingActions.create(this.model);
		this.model = new Rating();
	};
	
	return RatingForm;
});