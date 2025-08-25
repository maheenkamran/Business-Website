import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./../styles/Messages.css";

const socket = io("http://localhost:3000"); // ✅ adjust backend URL if needed

const Messages = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const userRole = user?.role;

    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const messagesEndRef = useRef(null);

    // Register user on socket connect
    useEffect(() => {
        if (!userId) return;
        socket.emit("join", { userId });

        // Listen for incoming messages
        socket.on("receiveMessage", (msg) => {
            // Only append if it belongs to the currently selected chat
            if (
                (msg.sender === selectedContact?._id && msg.receiver === userId) ||
                (msg.receiver === selectedContact?._id && msg.sender === userId)
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [userId, selectedContact]);

    // Fetch contacts depending on role
    useEffect(() => {
        const fetchContacts = async () => {
            if (!userId) return;

            const endpoint =
                userRole === "Investor"
                    ? "http://localhost:3000/api/users/e"
                    : "http://localhost:3000/api/users/i";

            try {
                const res = await fetch(endpoint);
                const data = await res.json();
                const list =
                    userRole === "Investor"
                        ? data.entrepreneurs || []
                        : data.investors || [];
                setContacts(list);
            } catch (err) {
                console.error("Error fetching contacts:", err);
            }
        };

        fetchContacts();
    }, [userId, userRole]);

    // Fetch chat history with selected contact
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedContact) return;
            try {
                const res = await fetch(
                    `http://localhost:3000/api/messages/${userId}/${selectedContact._id}`
                );
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();
    }, [selectedContact, userId]);

    // Auto scroll down on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message via socket + persist in DB
    const handleSend = async () => {
        if (!newMessage.trim() || !selectedContact) return;

        const msgData = {
            sender: userId,
            receiver: selectedContact._id,
            content: newMessage,
            timestamp: new Date(),
        };

        // Emit socket event
        socket.emit("sendMessage", msgData);

        // Persist message to backend
        try {
            await fetch("http://localhost:3000/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(msgData),
            });
        } catch (err) {
            console.error("Error saving message:", err);
        }

        // Optimistic UI update
        setMessages((prev) => [...prev, msgData]);
        setNewMessage("");
    };

    return (
        <div className="messages-page">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Contacts</h3>
                {contacts.length === 0 ? (
                    <p>No contacts found</p>
                ) : (
                    contacts.map((contact) => (
                        <div
                            key={contact._id}
                            className={`contact ${selectedContact?._id === contact._id ? "active" : ""
                                }`}
                            onClick={() => setSelectedContact(contact)}
                        >
                            {contact.Fname} {contact.Lname}
                        </div>
                    ))
                )}
            </div>

            {/* Chat Area */}
            <div className="chat">
                {selectedContact ? (
                    <>
                        <h3>
                            Chat with {selectedContact.Fname} {selectedContact.Lname}
                        </h3>

                        <div className="messages-list">
                            {messages.map((msg, idx) => (
                                <div
                                    key={msg._id || idx}
                                    className={`message ${msg.sender === userId ? "sent" : "received"
                                        }`}
                                >
                                    <p>{msg.content}</p>
                                    <span className="timestamp">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="message-input">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>Select a contact to start chatting</p>
                )}
            </div>
        </div>
    );
};

export default Messages;
