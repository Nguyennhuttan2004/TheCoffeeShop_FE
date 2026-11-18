import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "/store/shop/cart-slice";
import { setProductDetails } from "/store/shop/products-slice";
import StarRatingComponent from "../common/star-rating";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "/store/shop/reivew-slice";
import { getAllOrdersByUserId } from "/store/shop/order-slice";
import LoginRequiredDialog from "../common/login-required-dialog";


function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const dispatch = useDispatch()
  const {toast} = useToast()
  const {user} = useSelector(state => state.auth)
  const { cartItems } = useSelector((state) => state.shopCart); 
  const { reviews, stats } = useSelector((state) => state.shopReview);
  const { orderList } = useSelector((state) => state.shopOrder);

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Chỉ còn ${getQuantity} sản phẩm cho mặt hàng này`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Sản phẩm đã được thêm vào giỏ hàng",
        });
      }
    });
  }
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setSelectedOrderId("");
  }
  function handleAddReview() {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    if (rating < 1 || rating > 5) {
      toast({
        title: "Vui lòng chọn từ 1 đến 5 sao",
        variant: "destructive",
      });
      return;
    }
    if (!selectedOrderId) {
      toast({
        title: "Vui lòng chọn đơn hàng đã hoàn thành",
        variant: "destructive",
      });
      return;
    }
    dispatch(
      addReview({
        orderId: selectedOrderId,
        productId: productDetails?._id,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        setSelectedOrderId("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Đánh giá thành công !",
        });
      } else {
        toast({
          title: data.payload.message || "Không thể gửi đánh giá",
          variant: "destructive",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  useEffect(() => {
    if (user?.id) dispatch(getAllOrdersByUserId(user.id));
  }, [user?.id]);

  const eligibleOrders = (orderList || []).filter(
    (order) =>
      order.orderStatus === "delivered" &&
      order.cartItems?.some(
        (item) => String(item.productId?._id || item.productId) === String(productDetails?._id)
      )
  );

  console.log(reviews, "reviews");

  const averageReview = stats?.averageReview || 0;


  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl font-bold text-black  ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              {productDetails?.price}₫
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-3xl font-bold text-red-500">
                {productDetails?.salePrice}₫
              </p>
            ) : null}
          </div >
          <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
          <StarRatingComponent rating={averageReview} />
          </div>
          <span className="text-muted-foreground">
              ({averageReview.toFixed(2)} - {stats?.totalReviews || 0} đánh giá)
            </span>
          </div>
          <div className="mt-2 flex gap-2 text-sm text-muted-foreground">
            {[5, 4, 3, 2, 1].map((star) => (
              <span key={star}>
                {star}★: {stats?.ratingBreakdown?.[star] || 0}
              </span>
            ))}
          </div>
          <div className="mt-5 mb-5">
            {Number(productDetails?.totalStock) <= 0 ? (
              <Button className="btnOOS w-full opacity-60 cursor-not-allowed">
               Hết hàng
              </Button>
            ) : (
              <Button
                className="btn w-full"
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Thêm sản phẩm
              </Button>
            )}
          </div>
         <Separator/>
         <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4" key={reviewItem._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {(reviewItem?.userName?.[0] || "U").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                        {reviewItem?.orderId ? (
                          <span className="text-xs font-semibold text-green-700">
                            Verified Purchase
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                      {reviewItem?.createdAt ? (
                        <p className="text-xs text-muted-foreground">
                          {new Date(reviewItem.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <h1>Chưa có đánh giá nào</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Viết đánh giá</Label>
              {user ? (
                eligibleOrders.length > 0 ? (
                  <select
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={selectedOrderId}
                    onChange={(event) => setSelectedOrderId(event.target.value)}
                  >
                    <option value="">Chọn đơn hàng đã hoàn thành</option>
                    {eligibleOrders.map((order) => (
                      <option key={order._id} value={order._id}>
                        Đơn hàng #{String(order._id).slice(-8)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Chỉ có thể đánh giá khi mua sản phẩm trong đơn đã hoàn thành.
                  </p>
                )
              ) : null}
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Hãy viết đánh giá của bạn cho sản phẩm ..."
              />
              <Button
                className="btn"
                onClick={handleAddReview}
                disabled={
                  reviewMsg.trim() === "" ||
                  rating < 1 ||
                  (user ? eligibleOrders.length === 0 : false)
                }
              >
                Lưu đánh giá
              </Button>
            </div>
          </div>
        </div>
        </DialogContent>
      </Dialog>
      <LoginRequiredDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
    </>
  );
}

export default ProductDetailsDialog;