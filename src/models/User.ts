const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    profileImage: { type: String }, // URL to profile image
    phoneNumber: { type: String },
    addresses: {
        billing: { type: String },
        shipping: { type: String }
    },
    status: { type: String, enum: ['active', 'suspended', 'deleted'], default: 'active' },
    loyaltyPoints: { type: Number, default: 0 },
    newsletterSubscription: { type: Boolean, default: true },
    preferredLanguage: { type: String, default: 'en' },
    preferredCurrency: { type: String, default: 'USD' },
    lastLogin: { type: Date },
    registrationDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        addedAt: { type: Date, default: Date.now }
    }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        orderDate: { type: Date },
        totalAmount: { type: Number },
        paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'] },
        orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'] }
    }],
    payments: [{
        paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
        paymentMethod: { type: String },
        amount: { type: Number },
        paymentStatus: { type: String, enum: ['success', 'failed'] },
        paymentDate: { type: Date }
    }],
    interactions: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        interactionType: { type: String, enum: ['viewed', 'added_to_cart', 'purchased'] },
        interactionTimestamp: { type: Date, default: Date.now }
    }],
    reviews: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String },
        reviewDate: { type: Date, default: Date.now }
    }],
    recommendations: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        recommendationScore: { type: Number, min: 0, max: 1 },
        lastUpdated: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
