const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
    },
    discount_type: {
        type: String,
        enum: ['percentage', 'amount'], // giảm % hay giảm số tiền cố định
        required: true,
    },
    discount_value: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    applicable_tour_ids: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour' 
    }],
}, { timestamps: true });

module.exports = mongoose.model('Promotion', PromotionSchema);
