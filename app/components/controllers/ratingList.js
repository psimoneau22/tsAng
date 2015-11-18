define(function(require){	
	//@Input() model: Rating[];
	
	var RatingListItem = require("components/controllers/ratingListItem");
	
	var RatingList = ng
		.Component({
			selector: 'rating-list',    
			templateUrl: 'app/components/templates/ratingList.html',
			directives: [ng.CORE_DIRECTIVES, RatingListItem]
		})
		.Class({
			constructor: function(){
				
			}
		});	
	
	return RatingList;
});