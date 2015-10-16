/// <reference path="../scripts/lib/typings/angular2/angular2.d.ts" />
import { Component, View, NgFor, provide } from 'angular2/angular2';
import Rating from 'ratingModel';
import RatingService from 'ratingService';
import Rater from 'rater';

@Component({
    selector: 'app',
    providers: [RatingService],
    templateUrl: 'app/app.html',
    directives: [NgFor, Rater]
})
export default class App {
    appName: string;
    ratings: Array<Rating>;
    constructor(ratingService: RatingService) {
        this.ratings = ratingService.getRatings();
        this.appName = "Ratings";
    }
}