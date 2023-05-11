import { Routes, Route } from "react-router-dom";
import Layout from "../layout/AdminLayout";
import AdminLogin from "../pages/Admin/AdminLogin";
import Dashboard from "../pages/Admin/Dashboard";
import PhotographersRequest from "../pages/Admin/PhotographersRequest";
import InitialImages from "../pages/Admin/PhotographerImages";
import PhotographersList from "../pages/Admin/PhotographersList";
import Users from "../pages/Admin/Users";
import Category from "../pages/Admin/Category";
import Banner from "../pages/Admin/Banner";
import Works from "../pages/Admin/Works";
import Sales from "../pages/Admin/WorkReport";
import PaymentSuccess from "../components/Ui/PaymentSuccessPage";
import Protect from "../protectorRouter/AdminProtect";
import WorkHistory from "../pages/Admin/WorkHistory";

function Admin() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<Protect />}>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/photographers/request" element={<PhotographersRequest />}/>
          <Route path="/photographers/images" element={<InitialImages />} />
          <Route path="/photographers/list" element={<PhotographersList />} />
          <Route path="/users/list" element={<Users />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/works" element={<Works />} />
          <Route path="/workHistory" element={<WorkHistory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess role={"admin"} />}/>
          <Route path="/category" element={<Category />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Admin;
