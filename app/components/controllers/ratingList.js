define(function(require){
	
	var RatingListItem = require("app/components/controllers/ratingListItem");
	
	var RatingList = ng.Component({
		selector: 'rating-list',    
		templateUrl: 'app/components/templates/ratingList.html',			
		directives: [ng.CORE_DIRECTIVES, RatingListItem],
		inputs: ['model'],
	}).Class({
		constructor: function(){
			this.model = [];				
		}
	});
	
	RatingList.prototype.somethingIsUber = function(rating){
		console.log(rating.title + " is uber." );
	};
	
	return RatingList;
});