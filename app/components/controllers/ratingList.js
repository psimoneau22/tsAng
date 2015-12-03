define(function(require){		
	
	var RatingListItem = require("app/components/controllers/ratingListItem");
	
	var RatingList = ng
		.Component({
			selector: 'rating-list',    
			templateUrl: 'app/components/templates/ratingList.html',
			inputs: ['model'],
			directives: [ng.CORE_DIRECTIVES, RatingListItem]
		})
		.Class({
			constructor: function(){
				this.model = [];				
			}			
		});	
	
	return RatingList;
});