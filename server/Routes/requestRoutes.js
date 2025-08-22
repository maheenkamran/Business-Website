const express = require("express");
const Request = require("../models/Request");

const router = express.Router();

// Create new request
router.post("/", async (req, res) => {
    try {
        const { name, email, requestType, details } = req.body;
        const newRequest = new Request({ name, email, requestType, details });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all requests
router.get("/", async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get request by ID
router.get("/:id", async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ error: "Request not found" });
        res.json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete request
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Request.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Request not found" });
        res.json({ message: "Request deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
