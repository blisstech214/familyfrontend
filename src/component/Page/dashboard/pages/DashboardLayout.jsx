import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const DashboardLayout = () => {
  return (
    <div className="">
      {/* Profile Sidebar */}
      <div className="">
        <SideBar />
      </div>
    </div>
  );
};

export default DashboardLayout;
