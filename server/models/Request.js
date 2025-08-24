const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    investor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, default: "" },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);
