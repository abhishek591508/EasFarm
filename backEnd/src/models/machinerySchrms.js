const mongoose = require('mongoose');


const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true, unique: true }, // one account per phone
    address: { type: String },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true } // [lng, lat]
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isVerified: { type: Boolean, default: false }, // optional if you want verification
}, { timestamps: true });

serviceProviderSchema.index({ location: "2dsphere" });
const service_provider = module.exports = mongoose.model("service_provider", serviceProviderSchema);


const toolsSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Tractor"
    description: { type: String },
    image: { type: String },
    category: { type: String, enum: ["Tractor", "Plough", "Harvester", "Other","Dozer","Loader"], required: true },

    available: { type: Boolean, default: true },
    rentPrice: { type: Number },
    rentUnit: { type: String, enum: ["per_day", "per_hour"], default: "per_day" },

    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service_provider",
        required: true
    },

    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
        comment: String,
        rating: { type: Number, min: 0, max: 5 }
    }],

    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

toolsSchema.index({ category: 1 });

const tools = mongoose.model("tools", toolsSchema);

module.exports = {tools,service_provider};