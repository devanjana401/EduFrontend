import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api"; 

const ChatPage = () => {
    const { courseId, userId } = useParams(); // userId here is the Student ID
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    // Get the logged-in user's ID (could be Student OR Vendor)
    const currentUserId = localStorage.getItem("user_id");

    useEffect(() => {
        if (!courseId || !userId) return;

        // Fetch previous messages
        const fetchHistory = async () => {
            try {
                const res = await API.get(`/userside/chat/history/${courseId}/${userId}/`);
                setMessages(res.data);
            } catch (err) {
                console.error("History error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();

        // Initialize WebSocket
        const url = `ws://127.0.0.1:8000/ws/chat/${courseId}/${userId}/`;
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            // Append new message to the list
            setMessages((prev) => [...prev, data]);
        };

        socket.onopen = () => console.log("✅ WebSocket Connected");
        socket.onclose = () => console.log("❌ WebSocket Disconnected");

        return () => socket.close();
    }, [courseId, userId]);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim() || !socketRef.current) return;

        if (socketRef.current.readyState === WebSocket.OPEN) {
            const payload = {
                message: input,
                sender_id: currentUserId // Sending as string/int based on storage
            };
            socketRef.current.send(JSON.stringify(payload));
            setInput(""); // Clear input field
        } else {
            alert("Connection lost. Please refresh.");
        }
    };

    if (loading) return <div className="text-center p-10">Loading Chat...</div>;

    return (
        <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="bg-indigo-600 p-4 text-white font-bold">Live Support</div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, i) => {
                    // Compare IDs strictly
                    const isMe = String(msg.sender_id) === String(currentUserId);
                    return (
                        <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                                isMe ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-gray-800 border rounded-bl-none"
                            }`}>
                                <p className="text-sm">{msg.message}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t flex gap-2">
                <input 
                    className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;