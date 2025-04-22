const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    booking_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Booking' 
    },
    payment_method: { 
      type: String, 
      enum: ['credit_card', 'bank_transfer', 'cash_on_delivery'] 
    },
    payment_status: { 
      type: String, 
      enum: ['pending', 'deposited', 'completed', 'failed'], 
      default: 'pending' 
    },
    transaction_id: String,
    payment_date: { 
      type: Date, 
      default: Date.now 
    },
  });
  
module.exports = mongoose.model('Payment', PaymentSchema);
  