import { toast } from "react-toastify";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "../../instance/axios";
import { useNavigate } from "react-router-dom";

export default function WorkDetails({ visible, onClose, details }) {
  const navigate = useNavigate();

  const amount = (details?.totalAmount * 80) / 100;

  const handlePaymentSuccess = async () => {
    await axios.patch("/admin/works/" + details._id, { amount }).then((res) => {
      navigate("/admin/paymentSuccess");
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded w-2/6 m-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
            {details.company.companyName}
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex justify-between mx-5 text-lg">
          <p>Photographer Name</p>
          <p>{details.company.name}</p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>Email</p>
          <p>{details.company.email}</p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>User Name</p>
          <p>{details.user.name}</p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>Mobile No:</p>
          <p>{details.user.mobile}</p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>Advance Paid</p>
          <p>{details.advance}</p>
        </div>
        {details.success ? (
          <div className="flex justify-between mx-5 mt-5 text-lg">
            <p>Balance Paid</p>
            <p>{details.balance}</p>
          </div>
        ) : null}
        {details.totalAmount ? (
          <div className="flex justify-between mx-5 mt-5 text-lg">
            <p>Total</p>
            <p>{details.totalAmount}</p>
          </div>
        ) : null}
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>Payment Status</p>
          <p
            className={`font-bold ${
              details.success ? "text-green-500" : "text-yellow-400"
            }`}
          >
            {details.success ? "Payment success" : "Payment Pending"}
          </p>
        </div>
        {details.success ? (
          <div className="flex justify-between mx-5 mt-5 text-lg">
            <p>Payment of Photographer</p>
            <p>{amount}</p>
          </div>
        ) : null}
        <div className="text-center mt-5 mx-14">
          {details.success ? (
            <PayPalScriptProvider
              options={{ "client-id":"AZt9846IPXQJxVu7QBDlcAzLM1zM1LtY5SJahEuoXICFiLcRn3su71bcJIb0Ob8mObuOt6sL5bWHnt-n" }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "pay",
                  zIndex: 2,
                  height: 40,
                }}
                className="w-[350px] px-3 max-h-56 bg-white overflow-y-scroll"
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{ amount: { value: amount } }],
                  });
                }}
                onApprove={async (data, actions) => {
                  await actions.order.capture();
                  handlePaymentSuccess();
                }}
                onCancel={() => {
                  toast.error("payment cancelled");
                }}
                onError={() => {
                  toast.error("payment failed");
                }}
              />
            </PayPalScriptProvider>
          ) : null}
        </div>
      </div>
    </div>
  );
}
