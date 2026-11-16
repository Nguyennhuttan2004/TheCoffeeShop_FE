import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (!paymentId || !payerId) {
      console.error("❌ Missing PayPal parameters!");
      navigate("/shop/payment-failed");
      return;
    }
  
    let orderId = sessionStorage.getItem("currentOrderId");
  
    if (!orderId) {
      console.error("❌ Order ID not found in sessionStorage!");
      navigate("/shop/payment-failed");
      return;
    }
  
    // ✅ FIX: Loại bỏ dấu ngoặc kép dư thừa nếu có
    orderId = orderId.replace(/"/g, "");
  
    console.log("📥 Sending Capture Request:", { paymentId, payerId, orderId });
  
    dispatch(capturePayment({ paymentId, payerId, orderId }))
      .then((data) => {
        if (data?.payload?.success) {
          console.log("✅ Payment Captured Successfully:", data.payload);
          sessionStorage.removeItem("currentOrderId");
          navigate("/shop/payment-success");
        } else {
          console.error("❌ Payment Capture Failed:", data.payload);
          navigate("/shop/payment-failed");
        }
      })
      .catch((error) => {
        console.error("🚨 Capture Payment Error:", error);
        navigate("/shop/payment-failed");
      });
  }, [paymentId, payerId, dispatch, navigate]);
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
