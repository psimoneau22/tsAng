define(function(require) {
    
    var RatingForm = require("app/components/controllers/ratingForm");
    var RatingList = require("app/components/controllers/ratingList");
    
    var App = ng .Component({
        selector: 'app',    
        templateUrl: 'app/components/templates/app.html',
        directives: [ng.CORE_DIRECTIVES, RatingForm, RatingList]
    }).Class({
        constructor: [ng.Inject("RatingStore"), ng.Inject("RatingActions"),
            function App(ratingStore, ratingActions) {
                this.appName = "Ratings";
                this._ratingStore = ratingStore;
                this._ratingActions = ratingActions;
                this.ratings = [];
                
                var self = this;
                var _onChange = function() {
                    self.ratings = self._ratingStore.getAll();
                };
                
                var _onError = function(errorMessage) {
                    console.log(errorMessage);
                };
                
                ratingStore.addChangeListener(_onChange);
                ratingStore.addErrorListener(_onError);
                
                this.removeChangeListener = function() {
                    this._ratingStore.removeChangeListener(this._onChange);
                }
                
                this.removeErrorListener = function() {
                    this._ratingStore.removeErrorListener(this._onError);
                }
            }
        ],
        onInit: function() {
            this._ratingActions.initApp();
        },
        onDestroy: function() {        
            this.removeChangeListener();
            this.removeErrorListener();
            this._ratingActions.destroyApp();
        }
    });
    
    return App;
});