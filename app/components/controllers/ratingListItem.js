define(function(require) {
    var RatingActions = require("app/actions/ratingActions");
        
    var RatingListItem = ng
        .Component({
            selector: 'rating-list-item',
            templateUrl: 'app/components/templates/ratingListItem.html',
            directives: ng.CORE_DIRECTIVES,
            inputs: ['model']
        })
        .Class({
            constructor: [ng.Inject("RatingActions"), function(ratingActions){
                this._ratingActions = ratingActions;
                this.starScale = new Array(10);
                this.hoverIndex = -1;
                this.model = {};
            }],
            updateValue: function(value) {
                this.model.value = value;
                this._ratingActions.update(this.model);
            },
            remove: function() {
                this._ratingActions.delete(this.model);
            }
        });
        
    RatingListItem.rateCount = 0;
    
    return  RatingListItem;
});