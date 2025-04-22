const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    promotion_id: { 
        type: String, 
        unique: true 
    },
    value: Number,
    tour_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour' 
    },
    time_remain: Number,
  });
  
  module.exports = mongoose.model('Promotion', PromotionSchema);
  