import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { courseId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    // connect websocket
    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${courseId}/`
    );

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data.message]);
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected");
    };

    return () => socketRef.current.close();
  }, [courseId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socketRef.current.send(
      JSON.stringify({ message: input })
    );

    setInput("");
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">
        Course Chat
      </h2>

      <div className="border h-80 overflow-y-auto p-3 mb-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border flex-1 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;