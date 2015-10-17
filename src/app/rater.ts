import { Component } from 'angular2/angular2';
import Rating = require("./ratingModel");

@Component({
    selector: 'rater',
    templateUrl: 'src/app/rater.html',
})
class Rater {

    private static rateCount: number = 0;

    rating: Rating = null;
    id: number;

    constructor() {
        this.id = Rater.rateCount++;
    }

    doAlert() {
        alert(this.rating.title + this.rating.description);
    }
}

export = Rater;