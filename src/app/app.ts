import { Component, CORE_DIRECTIVES } from 'angular2/angular2';
import Rating = require('./ratingModel');
import RatingService = require('./ratingService');
import Rater = require('./rater');

@Component({
    selector: 'app',
    providers: [RatingService],
    templateUrl: './src/app/app.html',
    directives: [CORE_DIRECTIVES, Rater]
})
class App {
    
    ratingService: RatingService;
    
    private appName: string;
    private ratings: Array<Rating>;
    
    constructor(ratingService: RatingService) {
        this.ratingService = ratingService;
        this.updateRatings();
        this.appName = "Ratings";
    }
    
    updateRatings(){
        this.ratings = this.ratingService.getRatings();
    }
}

export = App;