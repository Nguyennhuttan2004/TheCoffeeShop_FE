  import { useState } from "react";
  import CommonForm from "../common/form";
  import { DialogContent } from "../ui/dialog";
  import { Label } from "../ui/label";
  import { Separator } from "../ui/separator";
  import { Badge } from "../ui/badge";
  import { useDispatch } from "react-redux";
  import {
    getAllOrdersForAdmin,
    getOrderDetailsForAdmin,
    updateOrderStatus,
  } from "/store/admin/order-slice";
  import { useToast } from "@/hooks/use-toast";

  const initialFormData = {
    status: "",
  };

  function AdminOrderDetailsView({ orderDetails }) {
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleUpdateStatus(event) {
      event.preventDefault();
      const { status } = formData;

      dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then((data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForAdmin(orderDetails?._id));
          dispatch(getAllOrdersForAdmin());
          setFormData(initialFormData);
          toast({ title: "Order status updated successfully!" });
        } else {
          toast({
            title: "Failed to update order status",
            description: data?.payload?.message,
            variant: "destructive",
          });
        }
      });
    }

    return (
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
          <h1 className="text-2xl font-bold text-[#A67C6D]">Order Details</h1>
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium text-gray-600">Order ID</p>
              <Label className="text-gray-900 font-semibold">{orderDetails?._id}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium text-gray-600">Order Date</p>
              <Label className="text-gray-900 font-semibold">{orderDetails?.orderDate?.split("T")[0]}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium text-gray-600">Order Amount</p>
              <Label className="text-[#A67C6D] font-bold">{orderDetails?.totalAmount}₫</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium text-gray-600">Payment Method</p>
              <Label className="text-gray-800 font-medium">{orderDetails?.paymentMethod}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium text-gray-600">Payment Status</p>
              <Label className="text-gray-800 font-medium">{orderDetails?.paymentStatus}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium text-gray-600">Order Status</p>
              <Badge
                className={`py-1 px-3 text-white font-semibold rounded-md text-sm ${
                  orderDetails?.orderStatus === "pending"
                    ? "bg-yellow-500"
                    : orderDetails?.orderStatus === "inShipping"
                    ? "bg-orange-500"
                    : orderDetails?.orderStatus === "delivered"
                    ? "bg-green-700"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium text-gray-600">Voucher</p>
              <Label className="text-green-600 font-semibold">
                {orderDetails?.voucherCode || "Không có"}
              </Label>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="font-medium text-[#A67C6D]">Order Items</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems?.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center justify-between text-sm text-gray-700"
                >
                  <span>Title: {item.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span className="text-[#A67C6D] font-medium">
                    Price: {item.price}₫
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="font-medium text-[#A67C6D]">Shipping Info</div>
            <div className="grid gap-0.5 text-gray-600">
              {orderDetails?.addressId ? (
                <>
                  <span>{orderDetails?.addressId?.streetAddress}</span>
                  <span>
                    {orderDetails?.addressId?.ward}, {orderDetails?.addressId?.district}, {orderDetails?.addressId?.city}
                  </span>
                  <span>{orderDetails?.addressId?.phone}</span>
                  <span>{orderDetails?.addressId?.notes}</span>
                </>
              ) : (
                <span className="text-red-500">Shipping information not available</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="font-medium text-[#A67C6D]">Update Order Status</div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </DialogContent>
    );
  }

  export default AdminOrderDetailsView;