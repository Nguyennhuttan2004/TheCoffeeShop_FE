import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminChat = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load tất cả hội thoại
  useEffect(() => {
    fetchAllThreads();

    const interval = setInterval(() => {
      fetchAllThreads(); // Tự động reload mỗi 5s
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchAllThreads = async () => {
    try {
  const res = await axios.get("https://thecoffeeshop-server.onrender.com/api/chat/all");
      setThreads(res.data);
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách hội thoại.");
    }
  };

  const selectThread = async (thread) => {
    setSelectedThread(thread);
    setMessage("");
  };

  const handleSend = async () => {
    if (!message.trim() || !selectedThread) return;

    try {
      const res = await axios.post(
  `https://thecoffeeshop-server.onrender.com/api/chat/${selectedThread._id}/message`,
        {
          sender: "admin",
          content: message,
        }
      );

      setSelectedThread(res.data);
      setMessage("");
      fetchAllThreads(); // cập nhật danh sách bên trái
    } catch (err) {
      console.error(err);
      setError("Không thể gửi tin nhắn.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar: danh sách thread */}
      <div className="w-1/3 p-4 overflow-y-auto bg-white dark:bg-gray-800 border-r">
        <h2 className="text-xl font-bold text-[#A67C6D] mb-4">Danh sách hội thoại</h2>
        {threads.length === 0 ? (
          <p className="text-gray-500">Không có hội thoại nào</p>
        ) : (
          <ul className="space-y-2">
            {threads.map((thread) => (
              <li
                key={thread._id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedThread?._id === thread._id ? "bg-gray-100" : ""
                }`}
                onClick={() => selectThread(thread)}
              >
                <div className="font-medium">{thread.userName}</div>
                <div className="text-sm text-gray-500 truncate">
                  {thread.messages[thread.messages.length - 1]?.content || "Không có tin nhắn"}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(thread.updatedAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chatbox */}
      <div className="flex flex-col w-2/3 p-4">
        {selectedThread ? (
          <>
            <h3 className="text-lg font-semibold mb-2">
              Đang trò chuyện với: {selectedThread.userName} ({selectedThread.userEmail})
            </h3>

            <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 border rounded-lg p-4 space-y-2 mb-4">
              {selectedThread.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-md ${
                    msg.sender === "admin"
                      ? "bg-blue-100 ml-auto text-right"
                      : "bg-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="bg-[#A67C6D] text-white px-4 py-2 rounded-lg"
              >
                Gửi
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            Chọn một hội thoại để bắt đầu
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
