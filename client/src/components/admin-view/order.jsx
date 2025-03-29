import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-detail";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "/store/admin/order-slice";
import ReactPaginate from "react-paginate";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 5;
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const sortedOrders = [...orderList].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  const pageCount = Math.ceil(sortedOrders.length / ordersPerPage);
  const displayedOrders = sortedOrders.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">
          All Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Voucher</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedOrders.map((orderItem) => (
              <TableRow key={orderItem?._id}>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`py-1 px-3 text-white font-semibold rounded-md ${
                      orderItem?.orderStatus === "pending"
                        ? "bg-yellow-500"
                        : orderItem?.orderStatus === "delivered"
                        ? "bg-green-700"
                        : orderItem?.orderStatus === "rejected"
                        ? "bg-red-500"
                        : orderItem?.orderStatus === "inShipping"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {orderItem?.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold uppercase tracking-wide">
                  {orderItem?.totalAmount.toLocaleString()}₫
                </TableCell>
                <TableCell
                  className={
                    orderItem?.voucherCode ? "text-green-600 font-semibold uppercase" : "font-semibold uppercase text-gray-800"
                  }
                >
                  {orderItem?.voucherCode || "Không có"}
                </TableCell>

                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                      setOpenDetailsDialog(false);
                      dispatch(resetOrderDetails());
                    }}
                  >
                    <Button
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      className="text-white font-medium px-4 py-2 rounded-md 
                      transition-all duration-300 ease-in-out 
                      bg-gradient-to-r from-[#A67C6D] via-[#D8CFC4] to-[#A67C6D]
                      hover:from-[#D8CFC4] hover:to-[#A67C6D]"
                    >
                      View Details
                    </Button>
                    <AdminOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center items-center mt-4 mr-40">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
