import ShoppingOrderDetailsView from "@/components/shopping-view/OrderDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/features/shopping/orderSlice";
import { Rat } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector(
    (state) => state.shoppingOrder
  );
  console.log(orderDetails, orderList, "ordersssssssssssssssssssssss");
  const dispatch = useDispatch();

  const handleGetOrderDetails = async (orderId) => {
    try {
      let result = await dispatch(getOrderDetails(orderId)).unwrap();
      console.log(result, "orderDetails");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getOrderList = async () => {
      try {
        const list = await dispatch(getAllOrdersByUser(user?._id)).unwrap();
        console.log(list, "order List");
      } catch (error) {
        console.log(error);
      }
    };
    getOrderList();
  }, [dispatch]);
  return (
    <Card>
      <CardHeader>Orders History</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">orders details</span>
              </TableHead>
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
                        order?.orderStatus === "confirmed" ? "bg-green-700" 
                        : 
                        order?.orderStatus === "rejected" ?"bg-red-800" :
                         ""
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
                          setOpenDetailsDialog(true);
                          handleGetOrderDetails(order?._id);
                        }}
                      >
                        View Details
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
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

export default ShoppingOrders;
