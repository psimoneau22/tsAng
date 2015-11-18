define(function(require) {
    
    var RatingForm = require("components/controllers/ratingForm");
    var RatingList = require("components/controllers/ratingList");
    var RatingActions = require("actions/ratingActions");
    var RatingStore = require("stores/ratingStore");
    
    var App = ng
        .Component({
            selector: 'app',    
            templateUrl: 'app/components/templates/app.html',
            directives: [ng.CORE_DIRECTIVES, RatingForm, RatingList]
        })
        .Class({
            constructor: [RatingStore, RatingActions, function(ratingStore, ratingActions) {
                this.appName = "Ratings";
                this._ratingStore = ratingStore;
                this._ratingActions = ratingActions;
                this.ratings = [];
                
                var self = this;
                ratingStore.addChangeListener(function(data){
                    self.ratings = self._ratingStore.getAll(); 
                });
                ratingStore.addErrorListener(function(errorMessage) {
                    console.log(errorMessage);
                });
            }],
            onInit: function() {
                this._ratingActions.initApp();
            },
            onDestroy: function() {        
                this._ratingStore.removeChangeListener(this._onChange);
                this._ratingStore.removeErrorListener(this._onError);
                this._ratingActions.destroyApp();
            }
        });
    
    return App;
});