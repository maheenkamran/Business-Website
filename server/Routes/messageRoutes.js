const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;

        if (!sender || !receiver || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const message = new Message({ sender, receiver, content });
        await message.save();

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all messages between two users
router.get("/:user1/:user2", async (req, res) => {
    try {
        const { user1, user2 } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
