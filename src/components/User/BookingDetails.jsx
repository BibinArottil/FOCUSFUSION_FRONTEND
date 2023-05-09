import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../instance/axios";

function BookingDetails({ visible, onClose, reload, details }) {
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    await axios.patch("/booking-update/" + details._id).then((res) => {
      navigate("/paymentSuccess");
    });
  };

  const handleCancel = async() =>{
    await axios.patch("/booking-cancel/"+details._id).then(()=>{
      reload()
    })
  }
  
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
          <p>
            Location
          </p>
          <p>{details.location}</p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Advance paid
          </p>
          <p>{details.advance}</p>
        </div>
        {
          details.totalAmount?
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Total
          </p>
          <p>{details.totalAmount}</p>
        </div>:null
        }
        {
          details.balance?
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Balance
          </p>
          <p>{details.balance}</p>
        </div>:null

        }
        <div className="text-center mt-2 mx-14"> 

         {details.balance ? 
          details.success ? 
            <h1 className="font-bold text-green-500 m-5">
            We are waiting for your next event.
          </h1>:
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
                  className="w-[350px] px-3 max-h-96 bg-white overflow-y-scroll"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: details.balance } }],
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
             
            

            
         : ( details.status!=="Cancelled" ?

          
           <h1 className="mb-5 text-gray-500 font-semibold">Your booking is pending please wait for the confirmation</h1>
           :null
         )
        }
        {
         !details.success && details.status!=="Cancelled"?
          <button
            className="px-32 py-2 border hover:bg-red-500 mb-5 font-bold  hover:text-white rounded"
            onClick={() => alert(handleCancel())}
          >
            CANCEL
          </button>:( details.success?
            null:
            <h1 className="font-bold text-red-600 mb-5">CANCELLED</h1>
          )

        }
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
