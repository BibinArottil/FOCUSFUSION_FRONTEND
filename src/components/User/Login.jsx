import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../instance/axios";
import { userLoginValidation } from "../../validation/validation";
import { loginValidation } from "../../validation/validation";
import { useDispatch } from "react-redux";
import { setDetails } from "../../redux/features/photographer";
import { userSetDetails } from "../../redux/features/user";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login({role}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState("user");
  const [check, setCheck] = useState(userLoginValidation);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");
  const [values, setValues] = useState({
    email: "",
    mobile: "",
    password: "",
  });
  const passwordType = () => {
    if (!visible) {
      setVisible(true);
      setType("text");
    } else {
      setVisible(false);
      setType("password");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      check
        .validate(values)
        .then(async () => {
          await axios
            .post(`/${select}-login`, {
              ...values,
            })
            .then((res) => {
              if (res.data.success) {
                dispatch(setDetails(res.data.photographer));
                localStorage.setItem(
                  "photographer",
                  res.data.photographerToken
                );
                navigate("/photographer/profile");
              }
              if (res.data.loggedIn) {
                dispatch(userSetDetails(res.data.user));
                localStorage.setItem("user",res.data.userToken)
                navigate("/list");
              }
            })
            .catch((err) => {
              if (err.response.data.pending === true) {
                navigate("/photographer/pending");
              } else if (err.response.data.reject === true) {
                navigate("/photographer/reject");
              } else {
                toast.error(err.response.data);
              }
              console.log(err);
            });
        })
        .catch((validateError) => {
          toast.error(`${validateError.message}`);
          console.log(validateError.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-around bg-gray-200 font-Lora fixed w-full">
        <div className={select==="photographer/photographer"?"w-full bg-slate-400":"w-full"}>
          <button
            className="w-full p-4"
            onClick={() => {
              setSelect("photographer/photographer");
              setCheck(loginValidation);
            }}
          >
            Photographer
          </button>
        </div>
        <div className={select==="user"?"w-full bg-slate-400":"w-full"}>
          <button
            className="w-full p-4"
            onClick={() => {
              setSelect("user");
              setCheck(userLoginValidation);
            }}
          >
            User
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="hidden sm:block h-screen text-center">
          <h1 className="text-3xl font-Lora tracking-widested mt-80 text-gray-400">
            FOCUSFUSION
          </h1>
          <h2 className="text-lg font-Lora">Login for seamless experience</h2>
        </div>
        <div className="flex flex-col justify-center p-5">
          <form
            className="flex flex-col max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 m-10 rounded-xl"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl dark:text-white font-bold text-center">
              WELCOME
            </h2>
            {select === "user" ? (
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
            ) : (
              <div className="flex flex-col text-gray-400 py-2">
                <label>Email</label>
                <input
                  className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
            )}

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
            {select === "user" ? (
              <div className="flex my-2 justify-between">
                <p className="text-white hidden sm:block">
                  Don't have an account?
                  <span className="text-blue-200 ml-3 font-semibold underline">
                    <Link to="/signup">Sign up</Link>
                  </span>
                </p>
                <span className="text-blue-200 ml-3 block sm:hidden font-semibold underline">
                  <Link to="/signup">Sign up</Link>
                </span>
                <p className="text-blue-200 ml-1 font-semibold">
                  <Link to="/forgotPassword">forgot password</Link>
                </p>
              </div>
            ) : (
              <div className="flex my-2 justify-between">
                <p className="text-white hidden sm:block">
                  Don't have an account?
                  <span className="text-blue-200 ml-3 font-semibold underline">
                    <Link to="/photographer/register">Register</Link>
                  </span>
                </p>
                <span className="text-blue-200 ml-3 block sm:hidden font-semibold underline">
                  <Link to="/photographer/register">Register</Link>
                </span>
              </div>
            )}
            <button className="mx-auto px-5 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
              Login
            </button>
            <p className="text-white underline">
              <Link to="/">Back to home</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
