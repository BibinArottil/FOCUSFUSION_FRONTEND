import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../instance/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupValidationSchema } from "../../validation/validation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignUp() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState("password")
  const [cVisible, setCVisible] = useState(false)
  const [cType, setCType] = useState("password")
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword:""
  });
  const passwordType = () => {
    if (!visible) {
      setVisible(true);
      setType("text");
    } else {
      setVisible(false);
      setType("password");
    }
}
  const cPasswordType = () => {
    if (!cVisible) {
      setCVisible(true);
      setCType("text");
    } else {
      setCVisible(false);
      setCType("password");
  };

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signupValidationSchema
        .validate(values)
        .then(async (validateData) => {
          await axios
            .post("/signup", {
              ...values,
            })
            .then((data) => {
              navigate("/otp", { state: values });
            })
            .catch((error) => {
              toast.error(`${error.response.data.message}`)
            }); 
        })
        .catch((validateError) => {
          toast.error(`${validateError.message}`)
        });
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 ">
      <div className="hidden sm:block h-screen text-center">
        <h1 className="text-3xl font-Lora tracking-widested mt-80 text-gray-400">
          FOCUSFUSION
        </h1>
        <h2 className="text-lg font-Lora">Sign up for seamless experience</h2>
      </div>
      <div className="flex flex-col justify-center p-5">
        <form
          className="flex flex-col max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 m-10 rounded-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl dark:text-white font-bold text-center">
            CREATE AN ACCOUNT
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Name</label>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="text"
              name="name"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Mobile No:</label>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="number"
              name="mobile"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="email"
              name="email"
              onChange={(e) =>setValues({ ...values, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <p className="flex flex-row-reverse mr-2 text-black relative">
                <i className="absolute top-4" onClick={passwordType}>
                  {visible ? (
                    <AiOutlineEye size={25} opacity={0.4} />
                  ) : (
                    <AiOutlineEyeInvisible size={25} opacity={0.4} />
                  )}
                </i>
              </p>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type={type}
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Confirm password</label>
            <p className="flex flex-row-reverse mr-2 text-black relative">
                <i className="absolute top-4" onClick={cPasswordType}>
                  {cVisible ? (
                    <AiOutlineEye size={25} opacity={0.4} />
                  ) : (
                    <AiOutlineEyeInvisible size={25} opacity={0.4} />
                  )}
                </i>
              </p>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type={cType}
              name="confirmPassword"
              onChange={(e) =>setValues({ ...values, [e.target.name]: e.target.value })}
            />
          </div>
          <div className="flex my-2">
            <p className="text-white">Do you have an account?</p>
            <p className="text-blue-200 ml-3 font-semibold underline">
              <Link to="/login">Login</Link>
            </p>
          </div>
          <button
            className="mx-auto px-5 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-white underline">
            <Link to="/">Back to home</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
