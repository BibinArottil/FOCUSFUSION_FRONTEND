import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHome from "../pages/User/Home";
import UserLogin from "../pages/User/Login";
import UserSignUp from "../pages/User/SignUp";
import Otp from "../pages/User/Otp";
import ForgotPassword from "../pages/User/ForgotPassword";
import ResetPassword from "../pages/User/ResetPassword";
import List from "../pages/User/List";
import Profile from "../pages/User/Profile";
import PhotographerView from "../pages/User/PhotographerView";
import BookAShoot from "../pages/User/BookShoot";
import Bookings from "../pages/User/Bookings";
import BookingHistory from "../pages/User/BookingHistory";
import ViewReview from "../pages/User/ViewReview"
import PaymentSuccess from "../components/Ui/PaymentSuccessPage";
import Layout from "../layout/UserLayout";
import Protect from "../protectorRouter/UserProtect";

function User() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/" element={<UserHome />} />
        <Route element={<Protect /> }>
          <Route path="/" element={<Layout />}>
            <Route path="/list" element={<List />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/view" element={<PhotographerView />} />
            <Route path="/bookShoot" element={<BookAShoot />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookingHistory" element={<BookingHistory />} />
            <Route path="/review" element={<ViewReview />} />
            <Route path="/paymentSuccess" element={<PaymentSuccess role={"user"}/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default User;
