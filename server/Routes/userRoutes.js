const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Register user
router.post("/register", async (req, res) => {
    try {
        const {
            Fname,
            Lname,
            email,
            password,
            role,
            bio,
            startupDescription,
            fundingNeed,
            pitchDeck,
            investmentInterests,
            portfolioCompanies
        } = req.body;

        // validation
        if (!Fname || !Lname || !email || !password || !role) {
            return res.status(400).json({ message: "All required fields are missing" });
        }

        // check duplicate email
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User({
            Fname,
            Lname,
            email,
            password,
            role,
            bio: bio || "",
            startupDescription: startupDescription || "",
            fundingNeed: fundingNeed || 0,
            pitchDeck: pitchDeck || "",
            investmentInterests: investmentInterests || "",
            portfolioCompanies: portfolioCompanies || []
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Get all entrepreneurs
router.get("/e", async (req, res) => {
    try {
        const entrepreneurs = await User.find({ role: "Entrepreneur" });
        res.status(200).json({ entrepreneurs });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch entrepreneurs" });
    }
});

// ✅ Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Update user
router.put("/:id", async (req, res) => {
    try {
        const {
            Fname,
            Lname,
            email,
            password,
            bio,
            startupDescription,
            fundingNeed,
            pitchDeck,
            investmentInterests,
            portfolioCompanies
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                Fname,
                Lname,
                email,
                password,
                bio,
                startupDescription,
                fundingNeed,
                pitchDeck,
                investmentInterests,
                portfolioCompanies
            },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Delete user
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
