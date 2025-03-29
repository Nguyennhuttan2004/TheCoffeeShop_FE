import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import paymentSuccess from "./../../assets/animations/Animation - paymentSuccessful.json";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-300 to-blue-400">
      <Card className="w-full max-w-xl p-8 shadow-2xl rounded-2xl bg-white text-center">
        <CardHeader className="flex flex-col items-center gap-4">
          <Lottie animationData={paymentSuccess} className="w-48 h-48" />
          <CardTitle className="text-4xl font-extrabold text-green-600">
            Thanh toán thành công!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-lg text-gray-700">
            Cảm ơn bạn đã tin tưởng và mua hàng tại <span className="font-semibold">The Coffee Shop</span>.
            Đơn hàng của bạn đã được xử lý thành công.
          </p>
          <p className="mt-4 text-base text-gray-600 italic">
            Chúc bạn một ngày thật trọn vẹn và tràn đầy năng lượng!
          </p>
          <Button
            onClick={() => navigate("/shop/account")}
            className="mt-6 bg-green-600 text-white hover:bg-green-700 transition duration-200"
          >
            Xem đơn hàng
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
