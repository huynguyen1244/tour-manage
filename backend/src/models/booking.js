const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    tour_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour' 
    },
    booking_date: { 
        type: Date, default: Date.now 
    },
    num_people: Number,
    total_price: Number,
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'cancelled'], 
        default: 'pending' },
  });
  
  module.exports = mongoose.model('Booking', BookingSchema);
  