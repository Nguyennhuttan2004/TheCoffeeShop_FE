import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://thecoffeeshop-server.onrender.com"
).replace(/\/+$/, "");

function Users() {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [hasOrders, setHasOrders] = useState("all");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [activityOpen, setActivityOpen] = useState(false);
  const [activityLogs, setActivityLogs] = useState([]);
  const [activityUnavailable, setActivityUnavailable] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [actionUser, setActionUser] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [actionType, setActionType] = useState("blocked");

  const fetchUsers = async (page = pagination.page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        withCredentials: true,
        params: {
          page,
          limit: pagination.limit,
          search,
          status,
          hasOrders,
          sort,
          order,
        },
      });
      if (Array.isArray(response.data)) {
        let legacyUsers = response.data
          .filter((user) => user.role !== "admin")
          .map((user) => ({
            ...user,
            accountStatus: user.accountStatus || "active",
            totalOrders: user.totalOrders || 0,
            totalSpent: user.totalSpent || 0,
          }));

        if (search.trim()) {
          const keyword = search.trim().toLowerCase();
          legacyUsers = legacyUsers.filter((user) =>
            String(user.userName || "").toLowerCase().includes(keyword) ||
            String(user.email || "").toLowerCase().includes(keyword) ||
            String(user.phone || "").toLowerCase().includes(keyword)
          );
        }
        if (status !== "all") {
          legacyUsers = legacyUsers.filter(
            (user) => (user.accountStatus || "active") === status
          );
        }

        const totals = await Promise.all(
          legacyUsers.map(async (user) => {
            try {
              const orderResponse = await axios.get(
                `${API_BASE_URL}/api/shop/order/user/${user._id}`,
                { withCredentials: true }
              );
              const orders = Array.isArray(orderResponse.data?.data)
                ? orderResponse.data.data
                : [];
              const paidOrders = orders.filter((order) =>
                order.orderStatus === "delivered" || order.paymentStatus === "paid"
              );
              return {
                ...user,
                totalOrders: orders.length,
                totalSpent: paidOrders.reduce(
                  (sum, order) => sum + Number(order.totalAmount || 0),
                  0
                ),
              };
            } catch {
              return user;
            }
          })
        );

        legacyUsers = totals;
        if (hasOrders === "with") {
          legacyUsers = legacyUsers.filter((user) => user.totalOrders > 0);
        } else if (hasOrders === "without") {
          legacyUsers = legacyUsers.filter((user) => user.totalOrders === 0);
        }
        legacyUsers.sort((a, b) => {
          if (sort === "totalOrders") {
            return (b.totalOrders - a.totalOrders) * (order === "asc" ? -1 : 1);
          }
          if (sort === "totalSpent") {
            return (b.totalSpent - a.totalSpent) * (order === "asc" ? -1 : 1);
          }
          if (sort === "userName") {
            return String(a.userName).localeCompare(String(b.userName));
          }
          if (a.createdAt && b.createdAt) {
            return (new Date(b.createdAt) - new Date(a.createdAt)) *
              (order === "asc" ? -1 : 1);
          }
          return 0;
        });

        const limit = pagination.limit;
        const total = legacyUsers.length;
        const totalPages = Math.max(Math.ceil(total / limit), 1);
        const safePage = Math.min(Math.max(page, 1), totalPages);
        setUsers(legacyUsers.slice((safePage - 1) * limit, safePage * limit));
        setPagination({
          page: safePage,
          limit,
          total,
          totalPages,
        });
      } else {
        setUsers(response.data.data || []);
        setPagination(response.data.pagination || pagination);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast({
          title: "Chức năng khóa/mở khóa chưa có trên backend đang deploy.",
          description: "Cần deploy backend mới trước khi sử dụng.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: error.response?.data?.message || "Không thể tải danh sách khách hàng",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, [status, hasOrders, sort, order]);

  useEffect(() => {
    const timeout = window.setTimeout(() => fetchUsers(1), 350);
    return () => window.clearTimeout(timeout);
  }, [search]);

  const openDetail = async (user) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/users/${user._id}/detail`,
        { withCredentials: true }
      );
      setDetail(response.data.data);
      setDetailOpen(true);
    } catch {
      try {
        const orderResponse = await axios.get(
          `${API_BASE_URL}/api/shop/order/user/${user._id}`,
          { withCredentials: true }
        );
        const orders = Array.isArray(orderResponse.data?.data)
          ? orderResponse.data.data
          : [];
        const productIds = new Set();
        orders.forEach((order) => {
          (order.cartItems || []).forEach((item) => {
            const productId = String(item.productId?._id || item.productId || "");
            if (productId) productIds.add(productId);
          });
        });

        const reviewGroups = await Promise.all(
          [...productIds].map(async (productId) => {
            try {
              const reviewResponse = await axios.get(
                `${API_BASE_URL}/api/shop/review/${productId}`
              );
              return Array.isArray(reviewResponse.data?.data)
                ? reviewResponse.data.data
                : [];
            } catch {
              return [];
            }
          })
        );
        const reviews = reviewGroups
          .flat()
          .filter((review) => String(review.userId?._id || review.userId) === String(user._id));
        const paidOrders = orders.filter((order) =>
          order.orderStatus === "delivered" || order.paymentStatus === "paid"
        );
        setDetail({
          user,
          statistics: {
            totalOrders: orders.length,
            totalSpent: paidOrders.reduce(
              (sum, order) => sum + Number(order.totalAmount || 0),
              0
            ),
            completedOrders: orders.filter((order) => order.orderStatus === "delivered").length,
            cancelledOrders: orders.filter((order) => order.orderStatus === "rejected").length,
            totalReviews: reviews.length,
            pendingOrders: orders.filter((order) => order.orderStatus === "pending").length,
            pendingAmount: orders
              .filter((order) => order.orderStatus === "pending")
              .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
          },
          orders,
          reviews,
          addresses: [],
        });
        setDetailOpen(true);
      } catch {
        toast({
          title: "Không thể tải chi tiết. Server backend hiện tại chưa hỗ trợ API chi tiết khách hàng.",
          variant: "destructive",
        });
      }
    }
  };

  const openActivity = async (user) => {
    try {
      setActivityUnavailable(false);
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/users/${user._id}/activity`,
        { withCredentials: true }
      );
      setActivityLogs(response.data.data || []);
      setActivityOpen(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setActivityLogs([]);
        setActivityUnavailable(true);
        setActivityOpen(true);
      } else {
        toast({
          title: error.response?.data?.message || "Không thể tải lịch sử hoạt động",
          variant: "destructive",
        });
      }
    }
  };

  const openAction = (user, type) => {
    setActionUser(user);
    setActionType(type);
    setActionReason("");
    setActionOpen(true);
  };

  const submitAction = async () => {
    if (actionType === "blocked" && actionReason.trim() === "") {
      toast({ title: "Vui lòng nhập lý do khóa tài khoản.", variant: "destructive" });
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/users/${actionUser._id}/${actionType === "blocked" ? "block" : "unblock"}`,
        { reason: actionReason.trim() },
        { withCredentials: true }
      );
      toast({ title: response.data.message });
      setActionOpen(false);
      await fetchUsers(pagination.page);
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Không thể cập nhật trạng thái tài khoản",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("vi-VN") + "₫";

  const formatDate = (value) =>
    value ? new Date(value).toLocaleString("vi-VN") : "Không rõ";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#A67C6D]">Quản lý khách hàng</h1>

      <div className="grid gap-3 rounded-lg border bg-white p-4 md:grid-cols-5">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm tên, email hoặc số điện thoại..."
          className="md:col-span-2"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-10 rounded-md border px-3"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="blocked">Đã khóa</option>
        </select>
        <select
          value={hasOrders}
          onChange={(event) => setHasOrders(event.target.value)}
          className="h-10 rounded-md border px-3"
        >
          <option value="all">Tất cả đơn hàng</option>
          <option value="with">Có đơn hàng</option>
          <option value="without">Chưa có đơn hàng</option>
        </select>
        <select
          value={`${sort}:${order}`}
          onChange={(event) => {
            const [nextSort, nextOrder] = event.target.value.split(":");
            setSort(nextSort);
            setOrder(nextOrder);
          }}
          className="h-10 rounded-md border px-3"
        >
          <option value="createdAt:desc">Ngày đăng ký mới nhất</option>
          <option value="createdAt:asc">Ngày đăng ký cũ nhất</option>
          <option value="totalOrders:desc">Tổng đơn giảm dần</option>
          <option value="totalSpent:desc">Tổng chi tiêu giảm dần</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-left">Khách hàng</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Ngày đăng ký</th>
              <th className="p-3 text-right">Đơn hàng</th>
              <th className="p-3 text-right" title="Chỉ tính đơn đã thanh toán hoặc đã giao">
                Đã chi tiêu
              </th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center">Đang tải...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-muted-foreground">
                  Không có khách hàng nào.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b last:border-0">
                  <td className="p-3">
                    <div className="font-semibold">{user.userName}</div>
                    <div className="text-xs text-muted-foreground">{user.phone || "Chưa có SĐT"}</div>
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{formatDate(user.createdAt)}</td>
                  <td className="p-3 text-right">{user.totalOrders || 0}</td>
                  <td className="p-3 text-right">{formatCurrency(user.totalSpent)}</td>
                  <td className="p-3">
                    {user.accountStatus === "blocked" ? (
                      <Badge className="bg-red-100 text-red-700">Đã khóa</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700">Hoạt động</Badge>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDetail(user)}>
                        Chi tiết
                      </Button>
                      {user.role !== "admin" && (
                        <Button
                          variant={user.accountStatus === "blocked" ? "default" : "destructive"}
                          size="sm"
                          onClick={() => openAction(
                            user,
                            user.accountStatus === "blocked" ? "unblocked" : "blocked"
                          )}
                        >
                          {user.accountStatus === "blocked" ? "Mở khóa" : "Khóa"}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => openActivity(user)}>
                        Nhật ký
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Tổng: {pagination.total} khách hàng
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() => fetchUsers(pagination.page - 1)}
          >
            Trước
          </Button>
          <span className="flex h-9 items-center px-2 text-sm">
            {pagination.page}/{pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => fetchUsers(pagination.page + 1)}
          >
            Sau
          </Button>
        </div>
      </div>

      <Dialog open={actionOpen} onOpenChange={setActionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "blocked" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
            </DialogTitle>
            <DialogDescription>
              {actionUser?.userName} — {actionUser?.email}
            </DialogDescription>
          </DialogHeader>
          {actionType === "blocked" && (
            <Textarea
              value={actionReason}
              onChange={(event) => setActionReason(event.target.value)}
              placeholder="Nhập lý do khóa tài khoản..."
              className="min-h-24"
            />
          )}
          {actionType === "unblocked" && (
            <Textarea
              value={actionReason}
              onChange={(event) => setActionReason(event.target.value)}
              placeholder="Ghi chú mở khóa (không bắt buộc)..."
              className="min-h-24"
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionOpen(false)}>Hủy</Button>
            <Button
              variant={actionType === "blocked" ? "destructive" : "default"}
              onClick={submitAction}
            >
              {actionType === "blocked" ? "Xác nhận khóa" : "Xác nhận mở khóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết khách hàng</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-5">
              <div className="grid gap-3 rounded-lg border p-4 md:grid-cols-2">
                <div><b>Tên:</b> {detail.user.userName}</div>
                <div><b>Email:</b> {detail.user.email}</div>
                <div><b>Số điện thoại:</b> {detail.user.phone || detail.addresses?.[0]?.phone || "Chưa có"}</div>
                <div><b>Ngày đăng ký:</b> {formatDate(detail.user.createdAt)}</div>
                <div><b>Trạng thái:</b> {detail.user.accountStatus === "blocked" ? "Đã khóa" : "Hoạt động"}</div>
                {detail.user.accountStatus === "blocked" && (
                  <div><b>Lý do khóa:</b> {detail.user.blockReason || "Không có"}</div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-lg border p-3"><b>Tổng đơn</b><div>{detail.statistics.totalOrders}</div></div>
                <div className="rounded-lg border p-3" title="Chỉ tính đơn đã thanh toán hoặc đã giao">
                  <b>Đã chi tiêu</b><div>{formatCurrency(detail.statistics.totalSpent)}</div>
                </div>
                <div className="rounded-lg border p-3"><b>Hoàn thành</b><div>{detail.statistics.completedOrders}</div></div>
                <div className="rounded-lg border p-3"><b>Đã hủy</b><div>{detail.statistics.cancelledOrders}</div></div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
                <b>Đơn chờ xử lý:</b> {detail.statistics.pendingOrders || 0} đơn
                <span className="ml-2 text-muted-foreground">
                  (Giá trị: {formatCurrency(detail.statistics.pendingAmount || 0)})
                </span>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Lịch sử mua hàng</h3>
                {detail.orders.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Chưa có đơn hàng.</p>
                ) : (
                  <div className="space-y-2">
                    {detail.orders.map((order) => (
                      <div key={order._id} className="flex justify-between rounded border p-3">
                        <div>#{String(order._id).slice(-8)} — {order.orderStatus}</div>
                        <div className="font-semibold">{formatCurrency(order.totalAmount)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Lịch sử đánh giá</h3>
                {detail.reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Chưa có đánh giá.</p>
                ) : (
                  <div className="space-y-2">
                    {detail.reviews.map((review) => (
                      <div key={review._id} className="rounded border p-3">
                        <b>{review.reviewValue} sao</b> — {review.reviewMessage}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={activityOpen} onOpenChange={setActivityOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lịch sử khóa/mở khóa</DialogTitle>
          </DialogHeader>
          {activityUnavailable ? (
            <p className="text-sm text-muted-foreground">
              Backend đang deploy chưa hỗ trợ lịch sử khóa/mở khóa.
            </p>
          ) : activityLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có lịch sử.</p>
          ) : (
            <div className="space-y-2">
              {activityLogs.map((log) => (
                <div key={log._id} className="rounded border p-3">
                  <div className="font-semibold">
                    {log.action === "blocked" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                  </div>
                  <div className="text-sm">Admin: {log.actorName || "Không rõ"}</div>
                  <div className="text-sm">Thời gian: {formatDate(log.createdAt)}</div>
                  <div className="text-sm">Lý do: {log.reason || "Không có"}</div>
                  <div className="text-sm">Kết quả: {log.result === "success" ? "Thành công" : "Thất bại"}</div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Users;
