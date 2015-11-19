

define(function(require){
	
	var App = require("app/components/controllers/app");
	var AppDispatcher = require("app/dispatcher/appDispatcher");
	var RatingStore = require("app/stores/ratingStore");
	var RatingActions = require("app/actions/ratingActions");
	var FirebaseRatingService = require("app/services/firebaseRatingService");
	
	var appKey = "tsang_firebase_url";
	var uid = localStorage.getItem(appKey);
	if(!uid){
		uid = Date.now();
		localStorage.setItem(appKey, uid); 
	}
	
	var appConfig = {
		useLiveUpdates: true,
		baseUrl: "https://tsang.firebaseio.com/" + uid
	};
	
	ng.bootstrap(App, [
		ng.provide("AppDispatcher", {useClass: AppDispatcher}),
		ng.provide("RatingStore", {useClass: RatingStore}),
		ng.provide("RatingActions", {useClass: RatingActions}),
		ng.provide("RatingService", {useClass: FirebaseRatingService}),
		ng.provide("AppConfig", { useValue: appConfig})	
	]);
});

