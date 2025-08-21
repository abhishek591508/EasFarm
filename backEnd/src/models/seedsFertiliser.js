const mongoose = require('mongoose');

const seedsFertiliserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Hybrid Maize Seed", "Urea Fertiliser"
    category: { type: String, enum: ["Seed", "Fertiliser", "Pesticide"], required: true },

    brand: { type: String, required: true }, // e.g., "IFFCO", "Monsanto", "Bayer"
    manufacturer: { type: String }, // manufacturing company name
    batchNumber: { type: String }, // for traceability
    certification: { type: String }, // e.g., "ICAR Certified", "ISO", govt approval
    isOrganic: { type: Boolean, default: false }, // organic or chemical-based

    description: { type: String }, // details about product
    image: { type: String }, // product image URL

    // Quantity & Packaging
    weight: { type: Number }, // e.g., 10
    weightUnit: { type: String, enum: ["kg", "g", "litre", "ml", "packet"], default: "kg" },
    packagingType: { type: String }, // e.g., "Bag", "Bottle", "Sachet"

    // Pricing
    price: { type: Number, required: true }, // e.g., 1200 (₹)
    discount: { type: Number, default: 0 }, // % discount
    currency: { type: String, default: "INR" },

    // Validity & Safety
    manufactureDate: { type: Date },
    expiryDate: { type: Date },
    storageInstructions: { type: String }, // "Store in cool dry place"
    usageInstructions: { type: String }, // dosage, how to apply
    safetyInfo: { type: String }, // safety precautions

    // Seller / Distributor info
    seller: {
        name: { type: String },
        contact: { type: String },
        location: { type: String },
        farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }
    },

    // Reviews & Ratings
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
        comment: String,
        rating: { type: Number, min: 0, max: 5 }
    }],

    // Metadata
    stockAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false }, // show on homepage
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('SeedsFertilisers', seedsFertiliserSchema);