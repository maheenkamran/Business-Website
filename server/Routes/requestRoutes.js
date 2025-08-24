const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const User = require("../models/User");

/**
 * POST /api/requests
 * Create a new collaboration request from an investor to an entrepreneur
 * body: { investorId, entrepreneurId, message }
 */
router.post("/", async (req, res) => {
    const { investor, entrepreneur, message, status } = req.body;

    if (!investor || !entrepreneur) {
        return res.status(400).json({ message: "Investor and Entrepreneur IDs are required" });
    }

    try {
        const newRequest = new Request({ investor, entrepreneur, message, status });
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create request" });
    }
});


/**
 * GET /api/requests/entrepreneur/:entrepreneurId
 * Fetch all requests sent to a specific entrepreneur
 */
router.get("/entrepreneur/:entrepreneurId", async (req, res) => {
    try {
        const requests = await Request.find({ entrepreneur: req.params.entrepreneurId })
            .populate("investor", "Fname Lname email");

        // Always return an array
        res.status(200).json({ requests: requests || [] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch requests" });
    }
});


/**
 * GET /api/requests/investor/:investorId
 * Fetch all requests sent by a specific investor
 */
router.get("/investor/:investorId", async (req, res) => {
    try {
        const requests = await Request.find({ investor: req.params.investorId })
            .populate("entrepreneur", "Fname Lname email startup pitch");

        res.status(200).json({ requests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch requests" });
    }
});

/**
 * PUT /api/requests/:requestId/status
 * Update the status of a request (Accept or Reject)
 * body: { status: "Accepted" | "Rejected" }
 */
router.put("/:requestId/status", async (req, res) => {
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const request = await Request.findByIdAndUpdate(
            req.params.requestId,
            { status },
            { new: true }
        );
        if (!request) return res.status(404).json({ message: "Request not found" });

        res.status(200).json({ request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update request status" });
    }
});

module.exports = router;
