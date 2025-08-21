const mongoose = require('mongoose');

const husbandrySchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Cattle Feed", "Layer Poultry Feed"
    category: {
        type: String,
        enum: ["Cattle Feed", "Poultry Feed", "Goat/Sheep Feed", "Fish Feed", "Supplements", "Veterinary Medicine", "Equipment"],
        required: true
    },

    brand: { type: String, required: true }, // e.g., "Amul", "Godrej Agrovet"
    manufacturer: { type: String },
    batchNumber: { type: String },
    certification: { type: String }, // Govt approval / FSSAI / ISO
    isOrganic: { type: Boolean, default: false },

    description: { type: String },
    image: { type: String },

    // Nutrition & Ingredients
    ingredients: [{ type: String }], // e.g., ["Maize", "Soybean meal", "Mineral mix"]
    nutritionalValues: {
        protein: { type: Number }, // percentage
        fat: { type: Number },
        fiber: { type: Number },
        energy: { type: Number } // kcal/kg
    },

    // Packaging
    weight: { type: Number }, // e.g., 50
    weightUnit: { type: String, enum: ["kg", "g", "litre", "ml", "packet"], default: "kg" },
    packagingType: { type: String }, // e.g., "Bag", "Sack", "Bottle"

    // Pricing
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },

    // Validity & Storage
    manufactureDate: { type: Date },
    expiryDate: { type: Date },
    storageInstructions: { type: String }, // e.g., "Keep in dry place, away from sunlight"
    feedingInstructions: { type: String }, // e.g., "2kg/day per cow"
    safetyInfo: { type: String }, // e.g., "Do not feed to calves under 2 months"

    // Seller / Distributor Info
    seller: {
        name: { type: String },
        contact: { type: String },
        location: { type: String },
        farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" }
    },

    // Veterinary Support
    vetSupportAvailable: { type: Boolean, default: false },
    helpline: { type: String }, // contact for veterinary help

    // Reviews & Ratings
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
        comment: String,
        rating: { type: Number, min: 0, max: 5 }
    }],

    // Metadata
    stockAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('Husbandry', husbandrySchema);