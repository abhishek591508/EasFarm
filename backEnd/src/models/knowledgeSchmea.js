const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g., "Crop Disease Identification"
    subtitle: { type: String }, // short caption

    category: {
        type: String,
        enum: ["Crop Diseases", "Farming Techniques", "Seasonal Guide", "Organic Practices", "Pest Control", "Water Management", "Soil Health", "Other"],
        required: true
    },

    description: { type: String, required: true }, // detailed explanation / content

    contentType: {
        type: String,
        enum: ["Article", "Video", "PDF", "Infographic", "Podcast"],
        default: "Article"
    },

    media: {
        images: [{ type: String }], // diagrams/photos
        videos: [{ type: String }], // YouTube/Vimeo links or uploaded videos
        pdfs: [{ type: String }], // downloadable PDFs
    },

    // Tags for search
    tags: [{ type: String }], // e.g., ["wheat", "fungus", "organic"]

    // Audience Targeting
    crops: [{ type: String }], // e.g., ["Wheat", "Rice", "Tomato"]
    season: { type: String, enum: ["Kharif", "Rabi", "Zaid", "All"], default: "All" },

    // Author / Source Info
    author: { type: String, default: "AgriTech Team" },
    source: { type: String }, // Govt, Research Institute, NGO
    verified: { type: Boolean, default: false }, // verified by experts

    // Engagement
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },

    // Related Links
    relatedLinks: [{ type: String }], // internal/external references
    link: { type: String }, // optional frontend link

    // Metadata
    isFeatured: { type: Boolean, default: false }, // highlight important guides
    language: { type: String, default: "English" }, // multilingual support
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('Knowledge', knowledgeSchema);