import React, { useState, useEffect } from "react";
import axios from "../../instance/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { bookingValidationSchema } from "../../validation/validation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function BookAShoot() {
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = userDetails._id;
  const [company, setCompany] = useState([]);
  const [value, setValue] = useState({
    company: "",
    location: "",
    time: "",
    date: "",
    advance: "",
  });
  const fetchData = async () => {
    await axios.get("/company-list").then((res) => {
      setCompany(res.data.data);
    });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      bookingValidationSchema
        .validate(value)
        .then(async () => {
          if (value.advance <= 1000) {
            toast.error("You should pay minimum 1000 above");
          }
        })
        .catch((validateError) => {
          console.log(validateError.message);
          toast.error(validateError.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = async () => {
    await axios.post("/shoot-booking", { ...value, userId }).then(() => {
      navigate("/paymentSuccess");
    });
  };

  return (
    <div className="w-100 h-96 rounded-lg mx-5 mt-14 sm:mt-32 bg-gray-300">
      <form onSubmit={handleBooking}>
        <div className="flex justify-around flex-wrap items-center pt-5 sm:mt-20 font-Lora text-lg">
          <div>
            <h1>Company Name</h1>
            <select
              className="rounded-lg text-gray-700 mt-2 p-2 px-8 focus:bg-gray-200 focus:outline-none"
              name="company"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
            >
              <option>Choose Company</option>
              {company?.map((data) => {
                return (
                  <option key={data._id} value={data._id}>
                    {data.companyName}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <h1>Location</h1>
            <input
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              className="rounded-lg text-gray-700 mt-2 px-4 sm:p-2 focus:bg-gray-200 focus:outline-none"
              type="text"
              name="location"
              placeholder="State,City"
            />
          </div>
          <div>
            <h1>Time</h1>
            <input
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              className="rounded-lg text-gray-700 mt-2 px-4 sm:p-2 focus:bg-gray-200 focus:outline-none"
              type="time"
              name="time"
            />
          </div>
          <div>
            <h1>Date</h1>
            <input
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              className="rounded-lg text-gray-700 mt-2 p-2 focus:bg-gray-200 focus:outline-none"
              type="date"
              name="date"
            />
          </div>
          <div>
            <h1>Advance amount</h1>
            <input
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              className="rounded-lg text-gray-700 mt-2 p-2 focus:bg-gray-200 focus:outline-none"
              type="number"
              name="advance"
            />
          </div>
        </div>
        <div className="flex h-full relative justify-center sm:mt-14">
          {value.company !== "" &&
          value.location !== "" &&
          value.time !== "" &&
          value.date !== "" &&
          value.advance >= 1000 ? (
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AZt9846IPXQJxVu7QBDlcAzLM1zM1LtY5SJahEuoXICFiLcRn3su71bcJIb0Ob8mObuOt6sL5bWHnt-n",
              }}
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
                className="w-[350px] px-3 absolute max-h-96 bg-gray-300 overflow-y-scroll"
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{ amount: { value: value.advance } }],
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
          ) : (
            <button className="px-10 py-2 bg-amber-400 rounded-lg">
              Pay Now
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookAShoot;
