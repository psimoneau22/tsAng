import ApiService = require('./apiService');
import Rating = require('../models/rating');

interface RatingService extends ApiService<Rating>{ }
export default RatingService;
