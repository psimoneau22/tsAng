import { Component, Input, CORE_DIRECTIVES } from 'angular2/angular2';
import RatingListItem = require('./ratingListItem');
import Rating = require('../../models/rating');

@Component({
    selector: 'rating-list',    
    templateUrl: 'app/components/templates/ratingList.html',
    directives: [CORE_DIRECTIVES, RatingListItem]
})
class RatingList {
	@Input() model: Rating[];
}

export = RatingList;