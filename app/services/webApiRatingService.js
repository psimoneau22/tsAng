define(function(require) {
	
	var Promise = require("es6-promise").Promise;
	var Rating = require("app/models/rating");
	
	var WebApiRatingService = ng.Class({
		constructor: [ng.Inject("AppConfig"), ngHttp.Http, function(appConfig, http) {
			this._url = appConfig.baseUrl;
			this._http = http;
		}]
	});
	
	WebApiRatingService.prototype.get = function(id) {
		var self = this;
		
		var result = new Promise(function(resolve, reject) {			
			self._http.get(self._url).map(function(res){
				console.log(res);
			});
		});
		
		return result;        
    }
    
    WebApiRatingService.prototype.query = function() {
		var self = this;
		
		var result = new Promise(function(resolve, reject) {
			self._http.get(self._url).map(function(res){
				console.log(res);
			});
		});		
				
		return result;
    }
	
	WebApiRatingService.prototype.add = function(rating) {
		var self = this;
		
		var result = new Promise(function(resolve, reject) {
			
			self._http.post(self._url, JSON.stringify(rating),
			{
				headers: new ngHttp.Headers({
					'Content-Type': 'application/json'
				})
			}).subscribe(function(x){
				resolve(x);
			});
		});
		
		return result;
	}
	// 
	// WebApiRatingService.prototype.update = function(rating) {
	// 	var self = this;
	// 	
	// 	var result = new Promise(function(resolve, reject) {
	// 		self._firebaseRatings.child(rating.id).update({				
	// 			title: rating.title || null,
	// 			description: rating.description || null,
	// 			value: rating.value || null
	// 		}, function(error) {
	// 			if(error){
	// 				reject(error);
	// 			}
	// 			else {
	// 				resolve(rating);
	// 			}
	// 		});
	// 	});
	// 	
	// 	return result;
	// }
	// 
	// WebApiRatingService.prototype.remove = function(rating) {
	// 	var self = this;
	// 	
	// 	var result = new Promise(function(resolve, reject) {
	// 		self._firebaseRatings.child(rating.id).set(null, function(error) {
	// 			if(error){
	// 				reject(error);
	// 			}
	// 			else {
	// 				resolve(rating);
	// 			}
	// 		});			
	// 	});		
	// 	
	// 	return result;
	// }
	
	return WebApiRatingService;
});