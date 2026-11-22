import React, { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN_BE } from "@/lib/constant";
import { Button } from "@/components/ui/button";

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", keywords: "" });
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const requestConfig = { withCredentials: true };

  const load = async () => {
    try {
      const [conversationRes, analyticsRes, faqRes] = await Promise.all([
        axios.get(`${DOMAIN_BE}/api/admin/chatbot/conversations`, requestConfig),
        axios.get(`${DOMAIN_BE}/api/admin/chatbot/analytics`, requestConfig),
        axios.get(`${DOMAIN_BE}/api/admin/chatbot/faq`, requestConfig),
      ]);
      setConversations(conversationRes.data.data);
      setAnalytics(analyticsRes.data.data);
      setFaqs(faqRes.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Không thể tải dữ liệu chatbot.");
    }
  };

  const openConversation = async (conversation) => {
    try {
      const res = await axios.get(
        `${DOMAIN_BE}/api/admin/chatbot/conversations/${conversation._id}`,
        requestConfig
      );
      setSelected(res.data.data.conversation);
      setMessages(res.data.data.messages);
      setReply("");
    } catch (err) {
      setError("Không thể tải nội dung hội thoại.");
    }
  };

  const sendReply = async () => {
    const content = reply.trim();
    if (!selected || !content || sendingReply) return;
    setSendingReply(true);
    try {
      const res = await axios.post(`${DOMAIN_BE}/api/admin/chatbot/conversations/${selected._id}/messages`, { content }, requestConfig);
      setMessages((current) => [...current, res.data.data.message]);
      setReply("");
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Không thể gửi phản hồi.");
    } finally {
      setSendingReply(false);
    }
  };

  const updateStatus = async (status) => {
    if (!selected) return;
    try {
      const res = await axios.patch(
        `${DOMAIN_BE}/api/admin/chatbot/conversations/${selected._id}/status`,
        { status },
        requestConfig
      );
      setSelected(res.data.data);
      await load();
    } catch (err) {
      setError("Không thể cập nhật trạng thái.");
    }
  };

  const createFaq = async () => {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
    try {
      await axios.post(
        `${DOMAIN_BE}/api/admin/chatbot/faq`,
        {
          question: faqForm.question.trim(),
          answer: faqForm.answer.trim(),
          keywords: faqForm.keywords.split(",").map((item) => item.trim()).filter(Boolean),
        },
        requestConfig
      );
      setFaqForm({ question: "", answer: "", keywords: "" });
      await load();
    } catch (err) {
      setError("Không thể tạo FAQ.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 xl:grid-cols-[320px_1fr_360px] gap-4">
      <section className="border rounded-lg p-4 h-[calc(100vh-140px)] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#A67C6D] mb-3">Hội thoại</h2>
        {analytics && (
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div className="rounded bg-gray-100 p-2">Tổng: {analytics.conversationCount}</div>
            <div className="rounded bg-gray-100 p-2">Đang mở: {analytics.activeCount}</div>
            <div className="rounded bg-gray-100 p-2">Chờ nhân viên: {analytics.handoffCount}</div>
            <div className="rounded bg-gray-100 p-2">Chưa xử lý: {analytics.unansweredCount}</div>
          </div>
        )}
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation._id}
              type="button"
              onClick={() => openConversation(conversation)}
              className={`w-full text-left border rounded-lg p-3 ${
                selected?._id === conversation._id ? "bg-[#F4ECE7]" : "bg-white"
              }`}
            >
              <div className="font-semibold">
                {conversation.userId?.userName || "Khách chưa đăng nhập"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {conversation.status} • {new Date(conversation.updatedAt).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="border rounded-lg p-4 h-[calc(100vh-140px)] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#A67C6D]">Nội dung</h2>
          {selected && (
            <select
              value={selected.status}
              onChange={(event) => updateStatus(event.target.value)}
              className="border rounded p-2"
              aria-label="Trạng thái hội thoại"
            >
              <option value="active">active</option>
              <option value="waiting_human">waiting_human</option>
              <option value="closed">closed</option>
            </select>
          )}
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                  ? "bg-blue-100 ml-auto"
                    : message.sender === "admin" ? "bg-green-100 ml-auto" : "bg-gray-100"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.intent && (
                <p className="text-xs text-gray-500 mt-1">Intent: {message.intent}</p>
              )}
            </div>
          ))}
        </div>
        {selected && <form className="mt-3 flex gap-2" onSubmit={(event) => { event.preventDefault(); sendReply(); }}>
          <input className="min-w-0 flex-1 rounded border p-2" value={reply} maxLength={1000} onChange={(event) => setReply(event.target.value)} placeholder="Trả lời khách hàng..." disabled={selected.status === "closed" || sendingReply} />
          <Button type="submit" disabled={!reply.trim() || selected.status === "closed" || sendingReply}>{sendingReply ? "Đang gửi..." : "Gửi"}</Button>
        </form>}
      </section>

      <section className="border rounded-lg p-4 h-[calc(100vh-140px)] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#A67C6D] mb-3">Quản lý FAQ</h2>
        <div className="space-y-2 mb-4">
          <input
            value={faqForm.question}
            onChange={(event) => setFaqForm({ ...faqForm, question: event.target.value })}
            placeholder="Câu hỏi"
            className="w-full border rounded p-2"
          />
          <textarea
            value={faqForm.answer}
            onChange={(event) => setFaqForm({ ...faqForm, answer: event.target.value })}
            placeholder="Câu trả lời"
            className="w-full border rounded p-2"
            rows={3}
          />
          <input
            value={faqForm.keywords}
            onChange={(event) => setFaqForm({ ...faqForm, keywords: event.target.value })}
            placeholder="Từ khóa, phân cách bằng dấu phẩy"
            className="w-full border rounded p-2"
          />
          <Button className="w-full" onClick={createFaq}>Thêm FAQ</Button>
        </div>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <article key={faq._id} className="border rounded p-3">
              <div className="font-semibold">{faq.question}</div>
              <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
              <button
                type="button"
                className="text-xs text-red-600 mt-2"
                onClick={async () => {
                  try { await axios.put(
                    `${DOMAIN_BE}/api/admin/chatbot/faq/${faq._id}`,
                    { isActive: !faq.isActive },
                    requestConfig
                  );
                  await load();
                  } catch (err) { setError(err.response?.data?.message || "Không thể cập nhật FAQ."); }
                }}
              >
                {faq.isActive ? "Tắt" : "Bật"}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminChat;
