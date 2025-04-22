const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    tour_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour' 
    },
    rating: Number,
    comment: String,
    review_date: { 
        type: Date, 
        default: Date.now 
    },
  });
  
  module.exports = mongoose.model('Review', ReviewSchema);
  