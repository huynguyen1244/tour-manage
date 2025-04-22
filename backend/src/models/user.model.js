const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        unique: true 
    },
    password_hash: String,
    phone: String,
    address: String,
    role: { 
        type: String, 
        enum: ['customer', 'admin', 'staff'], 
        default: 'customer' 
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('User', UserSchema);
