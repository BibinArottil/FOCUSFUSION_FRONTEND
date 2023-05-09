import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Photographer/Register";
// import Login from "../pages/User/Login";
import Layout from "../layout/PhotographerLayout";
import AccountDetails from "../pages/Photographer/AccountDetails";
import DisplayProfile from "../pages/Photographer/DisplayProfile";
import Gallery from "../pages/Photographer/Gallery";
import Bookings from "../pages/Photographer/Bookings";
import Reviews from "../pages/Photographer/Reviews";
import BookingHistory from "../pages/Photographer/BookingHistory";
import Pending from "../pages/Photographer/RequestPending";
import Reject from "../pages/Photographer/RequestReject";
import Protect from "../protectorRouter/PhotographerProtect"
import Chat from "../pages/Photographer/Chat"

function Photographer() {
  return (
    // <>
    <Routes>
      <Route path="/register" element={<Register />} />
      {/* <Route path="/login" element={<Login role={"photographer"}/>} /> */}
      <Route path="/reject" element={<Reject />} />
      <Route path="/pending" element={<Pending />} />
      <Route element={<Protect/>} >
      <Route path="/" element={<Layout />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/bookingHistory" element={<BookingHistory />} />
        <Route path="/profile" element={<AccountDetails />} />
        <Route path="/displayProfile" element={<DisplayProfile />} />
      </Route>
      </Route>
    </Routes>
    // </>
  );
}

export default Photographer;
