import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api"; 

const ChatPage = () => {
    const { courseId, userId } = useParams(); // userId is the student ID from URL
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    // get current logged-in user and normalize to string immediately
    const currentUserId = String(localStorage.getItem("user_id") || "").trim();

    useEffect(() => {
        if (!courseId || !userId) return;

        // fetch previous messages
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

        // initialize WebSocket
        const url = `ws://127.0.0.1:8000/ws/chat/${courseId}/${userId}/`;
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                // functional update prevents state race conditions
                setMessages((prev) => [...prev, data]);
            } catch (err) {
                console.error("Socket parse error:", err);
            }
        };

        socket.onopen = () => console.log("✅ WebSocket Connected");
        socket.onclose = () => console.log("❌ WebSocket Disconnected");

        // cleanup on unmount
        return () => {
            if (socketRef.current) socketRef.current.close();
        };
    }, [courseId, userId]);

    // auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim() || !socketRef.current) return;

        // safety check
        if (!currentUserId) {
            alert("Your session has expired. Please log in again.");
            return;
        }

        if (socketRef.current.readyState === WebSocket.OPEN) {
            const payload = {
                message: input,
                sender_id: currentUserId 
            };
            socketRef.current.send(JSON.stringify(payload));
            setInput(""); 
        } else {
            alert("Connection is currently down. Reconnecting...");
        }
    };

    if (loading) return <div className="text-center p-10 font-medium">Connecting to Chat...</div>;

    return (
        <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-xl overflow-hidden shadow-2xl bg-white my-10">
            {/* header */}
            <div className="bg-indigo-600 p-4 text-white font-bold flex justify-between items-center">
                <span>Live Support</span>
                <span className="text-xs bg-indigo-500 px-2 py-1 rounded">Room: {courseId}</span>
            </div>
            
            {/* chat body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 && !loading && (
                    <p className="text-center text-gray-400 mt-10 italic">No messages yet. Say hi!</p>
                )}

                {messages.map((msg, i) => {
                    // strict normalization: convert both to strings and trim to avoid type mismatch
                    const isMe = String(msg.sender_id || "").trim() === currentUserId;
                    
                    return (
                        <div key={i} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                                isMe 
                                ? "bg-indigo-600 text-white rounded-br-none" 
                                : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                            }`}>
                                <p className="text-sm leading-relaxed">{msg.message}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t flex gap-2 bg-white">
                <input 
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <button 
                    onClick={sendMessage} 
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors font-medium"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;