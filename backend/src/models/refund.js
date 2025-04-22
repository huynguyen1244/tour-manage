const mongoose = require('mongoose');

const RefundSchema = new mongoose.Schema({
    booking_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Booking' 
    },
    refund_amount: Number,
    refund_status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    refund_date: { 
        type: Date, 
        default: Date.now 
    },
  });
  
  module.exports = mongoose.model('Refund', RefundSchema);
  