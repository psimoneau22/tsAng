import {Inject, Injectable} from 'angular2/angular2';
import Firebase = require('firebase');
import Rating = require('../models/rating');
import FirebaseMessageConverter = require('./firebaseMessageConverter');
import ApiService from '../services/apiService';

class FirebaseRatingService implements ApiService<Rating> {
	
	private _firebaseRatings: Firebase;
	private _subscriptionToken: (snapshot: FirebaseDataSnapshot) => void;
	
	constructor(@Inject("ServiceConfig") serviceConfig: {baseUrl: string}) {
		this._firebaseRatings = new Firebase(serviceConfig.baseUrl + "/ratings");
	}
	
	get(id: string): Promise<Rating> {
		let result: Promise<Rating> = new Promise<Rating>((resolve, reject) => {
			this._firebaseRatings.child(id).once('value', (data) => {
				let getResult: Rating = data.val();
				let resultRating: Rating = new Rating(getResult.title , getResult.description,
					getResult.value);
				resultRating.id = getResult.id;
				resolve(resultRating);
			}, (error) => {
				reject(error);		
			});
		});
		
		return result;        
    }
    
    query(): Promise<Rating[]> {
		
		let result: Promise<Rating[]> = new Promise<Rating[]>((resolve, reject) => {
			this._firebaseRatings.once('value', (data) => {
				let queryResult: Rating[] = data.val();
				resolve(FirebaseMessageConverter.convertFromServiceArray(queryResult));
			}, (error) => {
				reject(error);		
			});
		});		
				
		return result;
    }
	
	add(rating: Rating): Promise<Rating> {
		
		let result = new Promise<Rating>((resolve, reject) => {
			let ref = this._firebaseRatings.push(rating, (error) => {
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
	
	update(rating: Rating): Promise<Rating> {
		
		let result = new Promise<Rating>((resolve, reject) => {
			this._firebaseRatings.child(rating.id).update({
				title: rating.title || null,
				description: rating.description || null,
				value: rating.value || null
			}, (error) => {
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
	
	remove(rating: Rating): Promise<Rating> {
		let result = new Promise<Rating>((resolve, reject) => {
			this._firebaseRatings.child(rating.id).set(null, (error) => {
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
	
	subscribe(callback: (ratings: Rating[]) => void) {
		this._subscriptionToken = this._firebaseRatings.on("value", (snapshot) => {
			let ratings : Rating[] = snapshot.val();
			callback(FirebaseMessageConverter.convertFromServiceArray(ratings));
		});
	}
	
	unsubscribe(){
		this._firebaseRatings.off("value", this._subscriptionToken);
	}
}

export = FirebaseRatingService;