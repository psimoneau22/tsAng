// import { Component, View, CORE_DIRECTIVES, OnDestroy, OnInit } from 'angular2/angular2';
// import RatingForm = require('./ratingForm');
// import RatingList= require('./ratingList');
// import RatingStore = require('../../stores/ratingStore');
// import Rating= require('../../models/rating');
// import RatingActions= require('../../actions/ratingActions');
// 
// @Component({
//     selector: 'app',    
//     templateUrl: 'app/components/templates/app.html',
//     directives: [CORE_DIRECTIVES, RatingForm, RatingList]
// })
define(function(require) {
    
    var App = function(ratingStore, ratingActions) {
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
    }   
        
    App.prototype.onInit = function() {
        this._ratingActions.initApp();
    }
    
    App.prototype.onDestroy = function() {        
        this._ratingStore.removeChangeListener(this._onChange);
        this._ratingStore.removeErrorListener(this._onError);
        this._ratingActions.destroyApp();
    }
    
    return App;
});