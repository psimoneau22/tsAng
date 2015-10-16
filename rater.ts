/// <reference path="../scripts/lib/typings/angular2/angular2.d.ts" />
import { Component, View } from 'angular2/angular2';

@Component({
    selector: 'rater'
})
@View({
    templateUrl: 'app/rater.html',
})
export default class Rater {

    private static rateCount: number = 0;

    title: string;
    description: string;
    id: string;

    constructor() {
        this.title = "Rater Title " + Rater.rateCount++;
        this.description = "Description " + Rater.rateCount;
        this.id = "raterID_" + Rater.rateCount;
    }

    doAlert() {
        alert(this.title + this.description);
    }
}
