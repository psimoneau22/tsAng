import { bootstrap, provide } from 'angular2/angular2';
import App = require('./components/controllers/app');
import AppDispatcher = require('./dispatcher/appDispatcher');
import Rating = require('./stores/ratingStore');
import RatingStore = require('./stores/ratingStore');
import RatingService = require('./services/ratingService');
import MessageConverter = require('./services/messageConverter');
import FirebaseMessageConverter = require('./services/firebaseMessageConverter');
import FirebaseRatingService = require('./services/firebaseRatingService');
import RatingActions = require('./actions/ratingActions');


bootstrap(App, [
	AppDispatcher, 
	provide(RatingService, 
		{
			useClass: FirebaseRatingService
		}, deps: [provide(MessageConverter, {useClass: FirebaseMessageConverter})]),
	provide(MessageConverter, {useClass: FirebaseMessageConverter}),  
	RatingStore, 
	RatingActions	
]);