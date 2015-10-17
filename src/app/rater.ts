import { Component, Input } from 'angular2/angular2';
import Rating = require("./ratingModel");

@Component({
    selector: 'rater',
    templateUrl: 'src/app/rater.html',
})
class Rater {

    private static rateCount: number = 0;

    @Input() model;
    id: number;

    constructor() {
        this.id = Rater.rateCount++;
    }

    doAlert() {
        alert(this.model.title + this.model.description);
    }
}

export = Rater;