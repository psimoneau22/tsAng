define(function(require) {
	
	var Promise = require("es6-promise").Promise;
	//var Firebase = require("firebase");
	
	var FirebaseMessageConverter = require("app/services/firebaseMessageConverter");	
	var Rating = require("app/models/rating");
	
	
	var FirebaseRatingService = ng.Class({
		constructor: [ng.Inject("AppConfig"), function(appConfig) {
			this._firebaseRatings = new Firebase(appConfig.baseUrl + "/ratings");
		}]
	});
	
	FirebaseRatingService.prototype.get = function(id) {
		var result = new Promise(function(resolve, reject) {
			this._firebaseRatings.child(id).once('value', function(data) {
				var getResult = data.val();
				var resultRating = new Rating(getResult.title , getResult.description,
					getResult.value);
				resultRating.id = getResult.id;
				resolve(resultRating);
			}, function(error) {
				reject(error);		
			});
		});
		
		return result;        
    }
    
    FirebaseRatingService.prototype.query = function() {
		
		var result = new Promise(function(resolve, reject) {
			this._firebaseRatings.once('value', function(data) {
				var queryResult = data.val();
				resolve(FirebaseMessageConverter.convertFromServiceArray(queryResult));
			}, function(error) {
				reject(error);		
			});
		});		
				
		return result;
    }
	
	FirebaseRatingService.prototype.add = function(rating) {
		
		var result = new Promise(function(resolve, reject) {
			var ref = this._firebaseRatings.push(rating, function(error) {
				if(error){
					reject(error);
				}
				else {
					rating.id = ref.key();
					resolve(rating);
				}
			});
		});
		
		return result;
	}
	
	FirebaseRatingService.prototype.update = function(rating) {
		
		var result = new Promise(function(resolve, reject) {
			this._firebaseRatings.child(rating.id).update({
				title: rating.title || null,
				description: rating.description || null,
				value: rating.value || null
			}, function(error) {
				if(error){
					reject(error);
				}
				else {
					resolve(rating);
				}
			});			
		});	
		
		return result;
	}
	
	FirebaseRatingService.prototype.remove = function(rating) {
		var result = new Promise(function(resolve, reject) {
			this._firebaseRatings.child(rating.id).set(null, function(error) {
				if(error){
					reject(error);
				}
				else {
					resolve(rating);
				}
			});			
		});		
		
		return result;
	}
	
	FirebaseRatingService.prototype.subscribe = function(callback) {
		this._subscriptionToken = this._firebaseRatings.on("value", function(snapshot) {
			var ratings = snapshot.val();
			callback(FirebaseMessageConverter.convertFromServiceArray(ratings));
		});
	}
	
	FirebaseRatingService.prototype.unsubscribe = function(){
		this._firebaseRatings.off("value", this._subscriptionToken);
	}
	
	return FirebaseRatingService;
});