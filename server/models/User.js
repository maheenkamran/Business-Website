const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Entrepreneur", "Investor"]
    },

    // Entrepreneur profile fields
    bio: { type: String, default: "" },
    startupDescription: { type: String, default: "" },
    fundingNeed: { type: Number, default: 0 }, // in currency
    pitchDeck: { type: String, default: "" }, // could be a URL or file path

    // Investor profile fields
    investmentInterests: { type: String, default: "" }, // e.g., "Tech, Health, AI"
    portfolioCompanies: { type: [String], default: [] } // array of company names
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
