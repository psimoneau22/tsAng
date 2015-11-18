define(function(require) {
    var RatingActions = require("actions/ratingActions");
    
    // private static rateCount: number = 0;
    // private _ratingActions: RatingActions;
    // 
    // starScale: number[];
    // hoverIndex: number;
    //   
    // @Input() model: Rating;
    
    var RatingListItem = ng
        .Component({
            selector: 'rating-list-item',
            templateUrl: 'app/components/templates/ratingListItem.html',
            directives: ng.CORE_DIRECTIVES
        })
        .Class({
            constructor: [RatingActions, function(ratingActions){
                this._ratingActions = ratingActions;
                this.starScale = new Array(10);
                this.hoverIndex = -1;
            }],
            updateValue: function(value) {
                this.model.value = value;
                this._ratingActions.update(this.model);
            },
            remove: function() {
                this._ratingActions.delete(this.model);
            }
        });
    
    return  RatingListItem;
});