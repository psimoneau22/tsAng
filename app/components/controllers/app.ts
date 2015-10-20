import { Component, View, CORE_DIRECTIVES, OnDestroy, OnInit } from 'angular2/angular2';
import RatingForm = require('./ratingForm');
import RatingList= require('./ratingList');
import RatingStore = require('../../stores/ratingStore');
import Rating= require('../../models/rating');
import RatingActions= require('../../actions/ratingActions');

@Component({
    selector: 'app',    
    templateUrl: 'app/components/templates/app.html',
    directives: [CORE_DIRECTIVES, RatingForm, RatingList]
})
class App implements OnDestroy, OnInit {
       
    private appName: string;
    private _ratingStore: RatingStore;
    private _ratingActions: RatingActions;
    private _onChange: {(data) : void};
    private _onError: {(errorMessage: string) : void};
    ratings: Rating[];
    
    constructor(ratingStore: RatingStore, ratingActions: RatingActions) {
        this.appName = "Ratings";
        this._ratingStore = ratingStore;
        this._ratingActions = ratingActions;
        this.ratings = [];
        
        var self = this;
        ratingStore.addChangeListener((data) => {
            self.ratings = self._ratingStore.getAll(); 
        });
        ratingStore.addErrorListener((errorMessage: string) => {
            console.log(errorMessage);
        });
    }   
        
    onInit() {
        this._ratingActions.getAll();
    }
    
    onDestroy(): void {
        console.log('destroyed appx');
        this._ratingStore.removeChangeListener(this._onChange);
        this._ratingStore.removeErrorListener(this._onError);
    }
}

export = App;