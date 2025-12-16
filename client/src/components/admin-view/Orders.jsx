import AdminOrderDetailsView from "@/components/admin-view/OrderDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllOrdersAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/features/admin/orderSlice";
import { Dialog } from "@radix-ui/react-dialog";
import { Rat } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);

  console.log(orderList, orderDetails, "order--- Admin");

  const dispatch = useDispatch();

  const handleGetOrderDetails = async (orderId) => {
    try {
      const result = await dispatch(getOrderDetailsForAdmin(orderId)).unwrap();
      console.log(result, "order details admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getOrderList = async () => {
      try {
        const result = await dispatch(getAllOrdersAdmin()).unwrap();
        console.log(result, " kkkkkkkkkkk result");
      } catch (error) {
        console.log(error);
      }
    };

    getOrderList();
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);
  return (
    <Card>
      <CardHeader>All Orders</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead className="sr-only">orders details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <TableRow>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 mb-0.5 ${
                        order?.orderStatus === "confirmed"
                          ? "bg-green-700"
                          : order?.orderStatus === "rejected"
                          ? "bg-red-800"
                          : ""
                      }`}
                    >
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleGetOrderDetails(order?._id);
                        }}
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h1>
                Your Order History will be displayed here...
                <Rat className="h-10 w-10" />{" "}
              </h1>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
