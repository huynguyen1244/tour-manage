const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    price: Number,
    available_slots: Number,
    schedule: String,
    transport: String,
    status: { 
        type: String, 
        enum: ['available', 'full', 'cancelled'], 
        default: 'available' 
    },
    images: [{
      type: String,
    }]
  }, { timestamps: { createdAt: 'created_at' } });
  
module.exports = mongoose.model('Tour', TourSchema);
  