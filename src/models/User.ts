const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String},
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
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
