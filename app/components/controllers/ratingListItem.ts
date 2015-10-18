import { Component, Input, CORE_DIRECTIVES } from 'angular2/angular2';
import Rating = require("../../models/rating");

@Component({
    selector: 'rating-list-item',
    templateUrl: 'app/components/templates/ratingListItem.html',
    directives: CORE_DIRECTIVES
})
class RatingListItem {

    private static rateCount: number = 0;
    
    starScale: number[];
    hoverIndex: number;  
      
    @Input() model: Rating;
    
    constructor(){
        this.starScale = new Array(10);
        this.hoverIndex = -1;
    }
}

export = RatingListItem;