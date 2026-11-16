import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
import { createNewOrder } from "/store/shop/order-slice";
import { CircleDollarSign, CreditCard } from "lucide-react";
import Slider from "@/components/shopping-view/slider";
import { useNavigate } from "react-router-dom";

function ShoppingCheckout({ onPaymentSuccess = () => {} }) {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [voucherError, setVoucherError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const rawTotal = cartItems?.items?.reduce(
    (sum, item) =>
      sum +
      (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
    0
  );

  let discount = 0;

  if (voucherInfo) {
    if (voucherInfo.type === "percent") {
      discount = Math.min(
        (rawTotal * voucherInfo.value) / 100,
        voucherInfo.maxDiscount || 100000
      );
    } else if (voucherInfo.type === "fixed") {
      discount = voucherInfo.value;
    }
  }

  const totalCartAmount = Math.max(0, rawTotal - discount);

  const handleApplyVoucher = async () => {
    if (!voucherCode) return;

    try {
  const res = await axios.get("https://thecoffeeshop-server.onrender.com/api/admin/voucher");
      const allVouchers = res.data.data;

      const found = allVouchers.find((v) => {
        const now = Date.now(); // dùng timestamp để so sánh chính xác
        return (
          v.code.trim().toLowerCase() === voucherCode.trim().toLowerCase() &&
          v.isActive &&
          (!v.expiredAt || new Date(v.expiredAt).getTime() > now)
        );
      });

      if (!found) {
        setVoucherInfo(null);
        setVoucherError("Voucher không hợp lệ hoặc đã hết hạn!");
        return;
      }

      if (rawTotal < found.minOrderAmount) {
        setVoucherInfo(null);
        setVoucherError(
          `Đơn hàng chưa đủ tối thiểu ${found.minOrderAmount.toLocaleString()}₫ để dùng mã này.`
        );
        return;
      }

      setVoucherInfo(found);
      setVoucherError("");
    } catch (err) {
      setVoucherError("Không thể kiểm tra mã giảm giá lúc này!");
      console.error(err);
    }
  };
  const handleRemoveVoucher = () => {
    setVoucherCode("");
    setVoucherInfo(null);
    setVoucherError("");
  };

  function handleInitiatePayment(paymentMethod) {
    if (!cartItems || cartItems.items.length === 0) {
      toast({
        title: "🛑 Giỏ hàng trống. Vui lòng thêm sản phẩm!",
        variant: "destructive",
      });
      return;
    }
    if (!currentSelectedAddress) {
      toast({
        title: "🛑 Chọn địa chỉ để tiếp tục!",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressId: currentSelectedAddress?._id,
      orderStatus: "pending",
      paymentMethod,
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      voucherCode: voucherInfo?.code || null,
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
        if (typeof onPaymentSuccess === "function") {
          onPaymentSuccess();
        }

        if (paymentMethod === "paypal" && data.payload.approvalURL) {
          window.location.href = data.payload.approvalURL;
        } else if (paymentMethod === "momo" && data.payload.payUrl) {
          window.location.href = data.payload.payUrl;
        } else if (paymentMethod === "cash") {
          toast({
            title: "✅ Đơn hàng đã được tạo. Bạn sẽ thanh toán khi nhận hàng!",
          });
          navigate("/shop/payment-success");
        } else {
          toast({
            title: "❌ Không nhận được link thanh toán!",
            variant: "destructive",
          });
        }
      } else {
        setIsPaymentStart(false);
        toast({
          title: "❌ Tạo đơn hàng thất bại!",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full p-6">
        <Slider />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 bg-white rounded-lg shadow-md">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 &&
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))}

          {/* VOUCHER */}
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1">
              Mã giảm giá
            </label>
            <div className="flex gap-2">
              <Input
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Nhập mã voucher..."
                className="flex-1"
              />
              {voucherInfo ? (
                <Button
                  onClick={handleRemoveVoucher}
                  className="bg-red-400 hover:bg-red-500 text-white"
                >
                  Huỷ mã
                </Button>
              ) : (
                <Button
                  onClick={handleApplyVoucher}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Áp dụng
                </Button>
              )}
            </div>
            {voucherError && (
              <p className="text-red-500 text-sm mt-1">{voucherError}</p>
            )}
            {voucherInfo && (
              <p className="text-green-600 text-sm mt-1">
                ✅ Đã áp dụng: {voucherInfo.code} (-{" "}
                {voucherInfo.type === "percent"
                  ? `${voucherInfo.value}%`
                  : `${voucherInfo.value.toLocaleString()}₫`}
                )
              </p>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span
                className={voucherInfo ? "text-green-600 font-semibold" : ""}
              >
                {totalCartAmount.toLocaleString()}₫
              </span>
            </div>
          </div>

          <div className="mt-4 w-full flex flex-col gap-3">
            <Button
              onClick={() => handleInitiatePayment("paypal")}
              disabled={isPaymentStart}
              className="flex items-center justify-center w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              <CircleDollarSign className="mr-2" />
              {isPaymentStart
                ? "Đang xử lý PayPal..."
                : "Thanh toán bằng PayPal"}
            </Button>

            <Button
              onClick={() => handleInitiatePayment("momo")}
              disabled={isPaymentStart}
              className="flex items-center justify-center w-full rounded-lg bg-[#B20873] text-white hover:bg-[#A2076A] transition duration-200"
            >
              <CreditCard className="mr-2" />
              {isPaymentStart ? "Đang xử lý MoMo..." : "Thanh toán bằng MoMo"}
            </Button>

            <Button
              onClick={() => handleInitiatePayment("cash")}
              disabled={isPaymentStart}
              className="flex items-center justify-center w-full rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-200"
            >
              🚚 {isPaymentStart ? "Đang xử lý..." : "Thanh toán khi nhận hàng"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
