define(function(require) {
	
	var Promise = require("es6-promise").Promise;
	var Rating = require("app/models/rating");
	
	var WebApiRatingService = ng.Class({
		constructor: [ng.Inject("AppConfig"), function(appConfig) {
			this._url = appConfig.baseUrl + "/ratings";
			this.subscriptionTokens = {};
		}]
	});
	
	FirebaseRatingService.prototype.get = function(id) {
		var self = this;
		
		var result = new Promise(function(resolve, reject) {			
			self._firebaseRatings.child(id).once('value', function(data) {				
				var getResult = data.val();
				var resultRating = new Rating(getResult.title , getResult.description, getResult.value);
				resultRating.id = getResult.id;
				resolve(resultRating);
				
			}, function(error) {
				reject(error);
			});
		});
		
		return result;        
    }
    
    FirebaseRatingService.prototype.query = function() {
		var self = this;
		
		var result = new Promise(function(resolve, reject) {
			self._firebaseRatings.once('value', function(data) {
				var queryResult = data.val();
				resolve(FirebaseMessageConverter.convertFromServiceArray(queryResult));
			}, function(error) {
				reject(error);		
			});
		});		
				
		return result;
    }
	
	FirebaseRatingService.prototype.add = function(rating) {
		var self = this;
		
		var result = new Promise(function(resolve, reject) {
			var ref = self._firebaseRatings.push(rating, function(error) {
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
		var self = this;
		
		var result = new Promise(function(resolve, reject) {
			self._firebaseRatings.child(rating.id).update({				
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
		var self = this;
		
		var result = new Promise(function(resolve, reject) {
			self._firebaseRatings.child(rating.id).set(null, function(error) {
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
	
	return FirebaseRatingService;
});