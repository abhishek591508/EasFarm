const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
    productName: { type: String, required: true }, // e.g., "Wheat", "Fresh Milk", "Onions"
    category: {
        type: String,
        enum: ["Grains", "Vegetables", "Fruits", "Dairy", "Pulses", "Livestock", "Fish", "Other"],
        required: true
    },

    description: { type: String },
    images: [{ type: String }], // multiple product images
    video: { type: String }, // optional video for trust

    // Quantity
    quantity: { type: Number, required: true }, // e.g., 100
    unit: { type: String, enum: ["kg", "quintal", "litre", "tonne", "piece"], default: "kg" },

    // Pricing
    price: { type: Number, required: true }, // per unit price
    currency: { type: String, default: "INR" },
    negotiable: { type: Boolean, default: false }, // whether bargaining is allowed

    // Quality & Certification
    qualityGrade: { type: String, enum: ["A", "B", "C"], default: "A" }, // farmer rating of produce
    certification: { type: String }, // "Organic", "FSSAI", "Govt Certified"

    // Seller Info
    seller: {
        farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
        name: { type: String },
        contact: { type: String },
        location: { type: String } // Village, District, State
    },

    // Buyer Info (once product is sold)
    buyer: {
        buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
        name: { type: String },
        contact: { type: String },
        location: { type: String }
    },

    // Logistics
    deliveryAvailable: { type: Boolean, default: false }, // seller provides delivery
    pickupLocation: { type: String }, // where buyer can pick up
    transportHelp: { type: Boolean, default: false }, // platform provides transport

    // Transaction Status
    status: {
        type: String,
        enum: ["Available", "Reserved", "Sold", "Expired"],
        default: "Available"
    },

    // Reviews & Ratings
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
        comment: String,
        rating: { type: Number, min: 0, max: 5 }
    }],

    // Metadata
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 }, // number of views on listing
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('Marketplace', marketplaceSchema);