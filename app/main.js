import { bootstrap, provide } from 'angular2/angular2';
import App = require('./components/controllers/app');
import AppDispatcher = require('./dispatcher/appDispatcher');
import Rating = require('./stores/ratingStore');
import RatingStore = require('./stores/ratingStore');
import FirebaseRatingService = require('./services/firebaseRatingService');
import RatingActions = require('./actions/ratingActions');

// generate unique id per user
let appKey = "tsang_firebase_url";
let uid = localStorage.getItem(appKey);
if(!uid){
	uid = Date.now();
	localStorage.setItem(appKey, uid); 
}

let appConfig = {
	useLiveUpdates: true,
	baseUrl: `https://tsang.firebaseio.com/${uid}/`
};
 
bootstrap(App, [
	AppDispatcher, 
	RatingStore, 
	RatingActions,	
	provide("ApiService<Rating>", {useClass: FirebaseRatingService}),
	provide("ServiceConfig", { useValue: appConfig}),
	provide("AppConfig", { useValue: appConfig})	
]);