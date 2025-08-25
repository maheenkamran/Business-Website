const express = require("express");
const cors = require("cors");
const http = require("http");           // ✅ needed for socket.io
const { Server } = require("socket.io");
const connectDB = require("./db.js");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
const server = http.createServer(app);  // ✅ wrap express with http server

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001", "http://localhost:5173"], // ✅ allow both
        methods: ["GET", "POST"],
    },
});


// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/requests", requestRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Hello from backend!");
});

// ✅ Socket.IO handlers
io.on("connection", (socket) => {
    // Join personal room by userId
    socket.on("join", (userId) => {
        socket.join(userId);
    });

    // Handle sending messages
    socket.on("sendMessage", (data) => {
        const { sender, receiver, content } = data;
        // broadcast to receiver
        io.to(receiver).emit("receiveMessage", {
            sender,
            content,
            timestamp: new Date(),
        });
    });

    socket.on("disconnect", () => {
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
