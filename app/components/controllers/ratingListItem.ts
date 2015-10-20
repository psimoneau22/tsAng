import { Component, Input, CORE_DIRECTIVES } from 'angular2/angular2';
import Rating = require("../../models/rating");
import RatingActions = require("../../actions/ratingActions");

@Component({
    selector: 'rating-list-item',
    templateUrl: 'app/components/templates/ratingListItem.html',
    directives: CORE_DIRECTIVES
})
class RatingListItem {

    private static rateCount: number = 0;
    private _ratingActions: RatingActions;
    
    starScale: number[];
    hoverIndex: number;
      
    @Input() model: Rating;
    
    constructor(ratingActions: RatingActions){
        this._ratingActions = ratingActions;
        this.starScale = new Array(10);
        this.hoverIndex = -1;
    }
    
    updateValue(value: number) {
        this.model.value = value;
        this._ratingActions.update(this.model);
    }
    
    remove() {
        this._ratingActions.delete(this.model);
    }
}

export = RatingListItem;