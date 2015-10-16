System.register(['ratingModel'], function(exports_1) {
    var ratingModel_1;
    var RatingService;
    return {
        setters:[
            function (ratingModel_1_1) {
                ratingModel_1 = ratingModel_1_1;
            }],
        execute: function() {
            RatingService = (function () {
                function RatingService() {
                    this._ratings = [];
                    this._ratings.push(new ratingModel_1.default("title1 test", "description1 test", false));
                    this._ratings.push(new ratingModel_1.default("title2 test", "description2 test", true));
                    this._ratings.push(new ratingModel_1.default("title3 test", "description3 test", false));
                }
                RatingService.prototype.getRatings = function () {
                    return this._ratings;
                };
                return RatingService;
            })();
            exports_1("default", RatingService);
        }
    }
});
//# sourceMappingURL=ratingService.js.map