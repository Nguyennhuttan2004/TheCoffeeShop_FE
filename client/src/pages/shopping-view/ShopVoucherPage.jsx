import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableVouchers } from "/store/admin/voucher-slice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

const ShopVoucherPage = () => {
  const dispatch = useDispatch();
  const { vouchers, isLoading } = useSelector((state) => state.adminVoucher);

  useEffect(() => {
    dispatch(fetchAvailableVouchers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6ec] to-[#f7f1ea] py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-[#A67C6D] mb-12 tracking-wide">
          ☕ Ưu Đãi Cà Phê Đặc Biệt Dành Riêng Cho Bạn
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải voucher...</p>
        ) : vouchers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vouchers.map((v) => (
              <div
                key={v._id}
                className="relative bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#A67C6D] hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <Coffee className="w-6 h-6 text-[#C2A98B] opacity-30" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#A67C6D] font-bold text-lg uppercase">
                    {v.code}
                  </span>
                  <Badge className={v.isActive ? "bg-green-600" : "bg-red-500"}>
                    {v.isActive ? "Hoạt động" : "Tạm ngưng"}
                  </Badge>
                </div>

                <p className="text-base text-gray-700 font-medium mb-1">
                  {v.type === "percent"
                    ? `Giảm ${v.value}% (tối đa ${v.maxDiscount.toLocaleString()}₫)`
                    : `Giảm ${v.value.toLocaleString()}₫`}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Đơn tối thiểu: {v.minOrderAmount.toLocaleString()}₫
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    HSD: {v.expiredAt ? new Date(v.expiredAt).toLocaleDateString() : "Không giới hạn"}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(v.code);
                      alert("Đã sao chép mã: " + v.code);
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Sao chép mã
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Hiện tại chưa có voucher nào.</p>
        )}
      </div>
    </div>
  );
};

export default ShopVoucherPage;