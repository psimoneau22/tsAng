require.config({
	paths: {
		//firebase: "/node_modules/firebase/lib/firebase-node",
		"es6-promise": "/es6-promise",
		flux: "/node_modules/flux/dist/flux",
		eventemitter: "/node_modules/wolfy87-eventemitter/eventemitter",
		angular: "/node_modules/angular2/bundles/angular2.sfx.dev"
	}
});

define(function(require){
	
	var App = require("components/controllers/app");
	var AppDispatcher = require("dispatcher/appDispatcher");
	var RatingStore = require("stores/ratingStore");
	var RatingActions = require("actions/ratingActions");
	var FirebaseRatingService = require("services/firebaseRatingService");	
	var angular = require("angular");
	
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
	
	angular.bootstrap(App, [
		AppDispatcher, 
		RatingStore, 
		RatingActions,	
		provide("RatingService", {useClass: FirebaseRatingService}),
		provide("ServiceConfig", { useValue: appConfig}),
		provide("AppConfig", { useValue: appConfig})	
	]);
});

