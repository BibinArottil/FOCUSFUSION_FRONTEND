import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
