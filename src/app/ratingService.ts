import Rating = require('./ratingModel');

class RatingService {
    
    _ratings: Array<Rating>;
    constructor() {
        this._ratings = [];
        this._ratings.push(new Rating("title1 test", "description1 test", false));
        this._ratings.push(new Rating("title2 test", "description2 test", true));
        this._ratings.push(new Rating("title3 test", "descriptionxc3 test", false));
    }    

    getRatings(): Array<Rating> {
        return this._ratings;
    }
}

export = RatingService;