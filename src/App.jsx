import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Navbar from "./component/main/Navbar";
import Login from "./component/Page/validate/Login";
import Forgot from "./component/Page/validate/Forgot";
import Reset from "./component/Page/validate/Reset";
import Registration from "./component/Page/validate/Registration";
import DashboardLayout from "./component/Page/dashboard/pages/DashboardLayout";
import HomeMain from "./component/Page/Home/HomeMain";
import Admin from "./component/Page/admin/Admin";
import AdminLogin from "./component/Page/admin/AdminLogin";
// Layout for routes where the Navbar is shown
function DefaultLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

// Layout for Admin routes (no Navbar)
function AdminLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomeMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<Reset />} />
        </Route>

        {/* Admin-specific routes without Navbar */}
        <Route element={<AdminLayout />}>
          <Route path="/profile" element={<DashboardLayout />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminProfile" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
