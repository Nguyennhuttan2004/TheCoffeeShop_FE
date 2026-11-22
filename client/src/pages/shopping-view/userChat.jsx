import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { DOMAIN_BE, getImageUrl } from "@/lib/constant";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";

const formatVnd = (value) =>
  new Intl.NumberFormat("vi-VN").format(Number(value) || 0);

const UserChat = ({ floating = false }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem("chatbotSessionId");
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem("chatbotSessionId", created);
    return created;
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState(false);
  const [open, setOpen] = useState(false);
  const messageEndRef = useRef(null);

  const loadConversation = async () => {
    try {
      const list = await axios.get(`${DOMAIN_BE}/api/chatbot/conversations`, {
        withCredentials: true,
        headers: { "x-session-id": sessionId },
      });
      const existing = list.data.data?.[0];
      if (!existing) return;
      setConversationId(existing._id);
      setHandoff(existing.status === "waiting_human");
      const detail = await axios.get(
        `${DOMAIN_BE}/api/chatbot/conversations/${existing._id}`,
        { withCredentials: true, headers: { "x-session-id": sessionId } }
      );
      setMessages(detail.data.data.messages);
    } catch (err) {
      setError(err.response?.data?.message || "Không thể tải hội thoại");
    }
  };

  const ensureConversation = async () => {
    if (conversationId) return conversationId;
    const res = await axios.post(
      `${DOMAIN_BE}/api/chatbot/conversations`,
      { sessionId },
      { withCredentials: true, headers: { "x-session-id": sessionId } }
    );
    setConversationId(res.data.data._id);
    return res.data.data._id;
  };

  const sendMessage = async () => {
    const content = message.trim();
    if (!content || loading) return;
    setLoading(true);
    setError("");
    try {
      const id = await ensureConversation();
      const pendingId = `pending-${Date.now()}`;
      setMessages((current) => [
        ...current,
        {
          _id: pendingId,
          sender: "user",
          content,
          createdAt: new Date().toISOString(),
        },
      ]);
      const res = await axios.post(
        `${DOMAIN_BE}/api/chatbot/conversations/${id}/messages`,
        { message: content },
        { withCredentials: true, headers: { "x-session-id": sessionId } }
      );
      setMessages((current) => [
        ...current.filter((item) => item._id !== pendingId),
        { _id: `sent-${pendingId}`, sender: "user", content, createdAt: new Date().toISOString() },
        res.data.data.message,
      ]);
      setProducts(res.data.data.products || []);
      setHandoff(
        res.data.data.metadata?.handoffRequested ||
          res.data.data.conversation?.status === "waiting_human"
      );
      setMessage("");
    } catch (err) {
      setMessages((current) => current.filter((item) => !String(item._id).startsWith("pending-")));
      setError(err.response?.data?.message || "Không thể gửi tin nhắn");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!conversationId) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(
        `${DOMAIN_BE}/api/chatbot/conversations/${conversationId}/add-to-cart`,
        { productId: product._id, quantity: 1 },
        { withCredentials: true, headers: { "x-session-id": sessionId } }
      );
      setMessages((current) => [
        ...current,
        {
          _id: `cart-${Date.now()}`,
          sender: "assistant",
          content: `Đã thêm 1 ly ${product.title} vào giỏ hàng sau khi bạn xác nhận.`,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Không thể thêm vào giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const createHandoff = async () => {
    if (!conversationId) return;
    try {
      await axios.post(
        `${DOMAIN_BE}/api/chatbot/conversations/${conversationId}/handoff`,
        { reason: "Khách yêu cầu hỗ trợ nhân viên" },
        { withCredentials: true, headers: { "x-session-id": sessionId } }
      );
      setHandoff(true);
      setError("");
    } catch (err) {
      setError("Không thể tạo yêu cầu hỗ trợ");
    }
  };

  useEffect(() => {
    loadConversation();
  }, [user, sessionId]);

  useEffect(() => {
    if (!conversationId || !open) return undefined;
    const refresh = async () => {
      try {
        const detail = await axios.get(`${DOMAIN_BE}/api/chatbot/conversations/${conversationId}`, {
          withCredentials: true,
          headers: { "x-session-id": sessionId },
        });
        setMessages(detail.data.data.messages);
        setHandoff(detail.data.data.conversation.status === "waiting_human");
      } catch { /* giữ nội dung hiện có nếu mạng chập chờn */ }
    };
    const timer = window.setInterval(refresh, 5000);
    return () => window.clearInterval(timer);
  }, [conversationId, open, sessionId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const chatPanel = (
    <div className={`${floating ? "flex flex-col h-full" : "max-w-4xl mx-auto p-4 md:p-6"} bg-white dark:bg-gray-900 rounded-lg shadow-md`}>
      {!floating && <h1 className="text-2xl md:text-3xl font-bold text-center text-[#A67C6D] mb-6">
        Trò chuyện tư vấn đồ uống
      </h1>}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-wrap gap-2 mb-4 px-3">
        {[
          "Gợi ý món ít cafein",
          "Món nào bán chạy?",
          "Tôi muốn món dưới 40k",
          "Có voucher nào không?",
          "Đơn hàng của tôi",
        ].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setMessage(suggestion)}
            className="rounded-full border border-[#A67C6D] px-3 py-1 text-sm text-[#A67C6D]"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className={`${floating ? "flex-1 min-h-0" : "h-[400px]"} overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 rounded`}>
        {messages.map((msg) => (
          <div
            key={msg._id || msg.createdAt}
            className={`max-w-[85%] mb-3 p-3 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-200 ml-auto text-right"
                : "bg-[#F4ECE7] border border-[#D8BDAA]"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(msg.createdAt || msg.timestamp || Date.now()).toLocaleString()}
            </p>
          </div>
        ))}

        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {products.map((product) => (
              <article key={product._id} className="border rounded-lg p-3 bg-white">
                {product.image && (
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <h3 className="font-bold mt-2">{product.title}</h3>
                <p className="text-[#A67C6D] font-semibold">
                  {formatVnd(product.salePrice > 0 ? product.salePrice : product.price)}đ
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/shop/listing")}
                  >
                    Xem chi tiết
                  </Button>
                  {user && (
                    <Button
                      className="flex-1"
                      onClick={() => addToCart(product)}
                      disabled={loading}
                    >
                      Xác nhận thêm 1 ly
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {loading && <p className="text-sm text-gray-500">AI đang xử lý...</p>}
        <div ref={messageEndRef} />
      </div>

      <div className="flex flex-col sm:flex-row mt-4 gap-2">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 border p-2 rounded"
          value={message}
          maxLength={1000}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage} disabled={loading || !message.trim()}>
          Gửi
        </Button>
        <Button
          variant="outline"
          onClick={createHandoff}
          disabled={!conversationId || handoff}
        >
          {handoff ? "Đã chuyển nhân viên" : "Nói chuyện nhân viên"}
        </Button>
      </div>
    </div>
  );

  if (!floating) return chatPanel;
  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {open && <section className="mb-3 flex h-[min(680px,80vh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border bg-white shadow-2xl">
        <header className="flex items-center justify-between bg-[#A67C6D] px-4 py-3 text-white">
          <div><strong>The Coffee Shop</strong><div className="text-xs opacity-90">Tư vấn trực tuyến</div></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Đóng chat"><X size={20}/></button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">{chatPanel}</div>
      </section>}
      <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#A67C6D] text-white shadow-lg" aria-label={open ? "Đóng chatbot" : "Mở chatbot"}>
        {open ? <X/> : <MessageCircle/>}
      </button>
    </div>
  );
};

export default UserChat;
