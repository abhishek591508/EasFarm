const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({

    // Mandatory fields
    fullName: {
        type: String,
        required: [true, 'Full name is required'], // this include custom error message if field is missing then mongoose will send.
        trim: true,
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true, // prevent duplicate registrations
        match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    password: {
        type: String,
        required: [true, 'Password/PIN is required'],

    },
    villageOrCity: {
        type: String,
        required: [true, 'Village or city is required'],
        trim: true,
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode'],
    },

    // Optional fields
    alternateMobile: {
        type: String,
        required: false,
        match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    gpsLocation: {
        type: {
            lat: { type: Number, required: false },
            lng: { type: Number, required: false },
        },
        required: false,
    },
    allowDataSharing: {
        type: Boolean,
        required: false,
        default: false,
    },
    role: {
        type: String,
        enum: ['farmer', 'serprovider', 'admin'],
        default: 'farmer'
    },

    // Consent - must be true
    acceptTerms: {
        type: Boolean,
        required: [true, 'Accepting Terms & Conditions is required'],
        validate: {
            validator: function(value) {
                return value === true;
            },
            message: 'You must accept the Terms & Conditions to register',
        },
    },
}, { timestamps: true });


const farmers = mongoose.model('farmer', farmerSchema);
module.exports = farmers;