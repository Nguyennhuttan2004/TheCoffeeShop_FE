import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const UserChat = () => {
  const email = localStorage.getItem("userEmail"); // ✅ Lấy từ hệ thống đăng nhập
  const userName = localStorage.getItem("userName");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchThreadByEmail = async () => {
    if (!email) return;
    try {
      const res = await axios.get(
  `https://thecoffeeshop-server.onrender.com/api/chat/user/${encodeURIComponent(email)}`
      );
      setMessages(res.data.messages);
      setThreadId(res.data._id);
    } catch (err) {
      // Không tìm thấy thread => chưa chat
      setMessages([]);
      setThreadId(null);
    }
  };

  const handleStartChat = async () => {
    if (!email || !userName || !message) {
      setError("Thiếu thông tin người dùng");
      return;
    }

    try {
      setLoading(true);
  const res = await axios.post("https://thecoffeeshop-server.onrender.com/api/chat/start", {
        userEmail: email,
        userName,
        message,
      });
      setThreadId(res.data._id);
      setMessages(res.data.messages);
      setMessage("");
      setError("");
    } catch (err) {
      console.error("Lỗi khởi tạo hội thoại:", err);
      setError("Không thể bắt đầu hội thoại");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !threadId) return;

    try {
      const res = await axios.post(
  `https://thecoffeeshop-server.onrender.com/api/chat/${threadId}/message`,
        {
          sender: "user",
          content: message,
        }
      );
      setMessages(res.data.messages);
      setMessage("");
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
      setError("Không thể gửi tin nhắn");
    }
  };

  useEffect(() => {
    if (email) fetchThreadByEmail();
  }, [email]);

  useEffect(() => {
    let interval;
    if (threadId) {
      interval = setInterval(() => {
        fetchThreadByEmail();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [threadId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-[#A67C6D] mb-6">
        Trò chuyện với hỗ trợ
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {!threadId ? (
        <div className="space-y-4">
          <textarea
            placeholder="Bạn cần hỗ trợ gì?"
            className="w-full border p-2 rounded"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleStartChat} disabled={loading}>
            Bắt đầu trò chuyện
          </Button>
        </div>
      ) : (
        <>
          <div className="h-[400px] overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 rounded">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[70%] mb-3 p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-200 ml-auto text-right"
                    : "bg-gray-300"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex mt-4 space-x-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="flex-1 border p-2 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Gửi</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserChat;
