import { bootstrap } from 'angular2/angular2';
import App = require('./components/controllers/app');
import AppDispatcher = require('./dispatcher/appDispatcher');
import RatingStore = require('./stores/ratingStore');
import RatingService = require('./services/ratingService');
import RatingActions = require('./actions/ratingActions');

bootstrap(App, [AppDispatcher, RatingService, RatingStore, RatingActions]);