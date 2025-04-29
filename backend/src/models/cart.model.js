const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
      },
    tour_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour', 
        required: true 
      },
    num_people: { 
        type: Number, 
        required: true, 
        min: 1, 
        default: 1 
      },
    total_price: { 
        type: Number, 
        required: true 
      },
  });
  
// Đảm bảo user không đặt cùng một tour nhiều lần
CartSchema.index({ user_id: 1, tour_id: 1 }, { unique: true });

  module.exports = mongoose.model('Cart', CartSchema);
  