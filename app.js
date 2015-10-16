System.register(['angular2/angular2', 'ratingService', 'rater'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var angular2_1, ratingService_1, rater_1;
    var App;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            },
            function (ratingService_1_1) {
                ratingService_1 = ratingService_1_1;
            },
            function (rater_1_1) {
                rater_1 = rater_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(ratingService) {
                    this.ratings = ratingService.getRatings();
                    this.appName = "Ratings";
                }
                App = __decorate([
                    angular2_1.Component({
                        selector: 'app',
                        providers: [ratingService_1.default],
                        templateUrl: 'app/app.html',
                        directives: [angular2_1.NgFor, rater_1.default]
                    })
                ], App);
                return App;
            })();
            exports_1("default", App);
        }
    }
});
//# sourceMappingURL=app.js.map