import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/features/shopping/orderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");


  useEffect(() => {
    const handleCapturePayment = async () => {
      if (paymentId && payerId) {
        let orderId = JSON.parse(sessionStorage.getItem("orderId"));
        try {
          const result = await dispatch(
            capturePayment({ orderId, paymentId, payerId })
          ).unwrap();
          sessionStorage.removeItem("orderId");
          window.location.href = "/shopping/payment-success"
        } catch (error) {
          console.log(error);
        }
      }
    };

    handleCapturePayment();
  }, [paymentId, payerId, dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment is Processing... Please Wait.</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturn;
