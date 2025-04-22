const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    message: String,
    status: { 
      type: String, 
      enum: ['unread', 'read'], 
      default: 'unread' 
    },
    created_at: { 
      type: Date, 
      default: Date.now 
    },
  });
  
  module.exports = mongoose.model('Notification', NotificationSchema);
  