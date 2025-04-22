const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    tour_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour' 
    },
    num_people: Number,
    total_price: Number,
  });
  
  module.exports = mongoose.model('Cart', CartSchema);
  