define(function(require) {
	
	var Rating = require("models/rating");
	var RatingActions = require("actions/ratingActions");
	
	var RatingForm = ng
		.Component({
			selector: 'rating-form',	
    		templateUrl: 'app/components/templates/ratingForm.html',
			directives: [ng.FORM_DIRECTIVES]			
		})
		.Class({
			constructor: [RatingActions, function(ratingActions){
				this.model = new Rating();
				this.ratingActions = ratingActions;
			}],
			getModelJson: function(){
				return JSON.stringify(this.model);
			},
			add: function(){
				this.ratingActions.create(this.model);
				this.model = new Rating();
			}
		});
	
	return RatingForm;
});