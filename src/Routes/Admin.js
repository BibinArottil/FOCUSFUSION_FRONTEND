import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/AdminLayout";
import AdminLogin from "../pages/Admin/AdminLogin";
import PhotographersRequest from "../pages/Admin/PhotographersRequest";
import InitialImages from "../pages/Admin/PhotographerImages"
import PhotographersList from "../pages/Admin/PhotographersList";
import Users from "../pages/Admin/Users";
import Category from "../pages/Admin/Category";
import Banner from "../pages/Admin/Banner";
import Works from "../pages/Admin/Works";
import Protect from "../protectorRouter/AdminProtect"

function Admin() {
  return (
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route element={<Protect/>}>
        <Route path="/" element={<Layout />}>
          <Route path="/photographers/request" element={<PhotographersRequest />} />
          <Route path="/photographers/images" element={<InitialImages />} />
          <Route path="/photographers/list" element={<PhotographersList />} />
          <Route path="/users/list" element={<Users />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/works" element={<Works />} />
          <Route path="/category" element={<Category />} />
        </Route>
      </Route>
      </Routes>
  );
}

export default Admin;
