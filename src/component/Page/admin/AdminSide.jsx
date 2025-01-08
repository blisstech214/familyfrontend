import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Drawer,
} from "@mui/material";
import Families from "./Families";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashBoard from "./DashBoard";
import { MdFamilyRestroom } from "react-icons/md";
import StayConnectShow from "./StayConnect/StayConnectShow";
import ShowBannerDetails from "./banner/ShowBannerDetails";
import GalleryShow from "./Gallery/GalleryShow";
import AdminResponse from "./AdminResponse";
function AdminSide() {
  const [activeNavItem, setActiveNavItem] = useState("DashBoard");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("activeNavItem");
    navigate("/admin", { replace: true });
  };

  // Navigation items
  const navItems = [
    {
      label: "DashBoard",
      icon: <DashboardIcon />,
      component: <DashBoard />,
    },
    {
      label: "Families",
      icon: <MdFamilyRestroom />,
      component: (
        <Families
          onSelectFamily={() => {
            setActiveNavItem("Family Members");
          }}
        />
      ),
    },
    {
      label: "Admin Responses",
      icon: <DashboardIcon />,
      component: <AdminResponse />,
    },
    // {
    //   label: "Approve",
    //   icon: <DashboardIcon />,
    //   component: <UserApprove />,
    // },
    // {
    //   label: "Reject",
    //   icon: <DashboardIcon />,
    //   component: <UserReject />,
    // },
    {
      label: "Banner Update",
      icon: <DashboardIcon />,
      component: <ShowBannerDetails />,
    },
    {
      label: "Gallery Update",
      icon: <DashboardIcon />,
      component: <GalleryShow />,
    },
    {
      label: "Event Update ",
      icon: <DashboardIcon />,
      component: <StayConnectShow />,
    },
  ];

  const renderSidebarContent = () => (
    <Box
      sx={{
        width: { xs: "100%", sm: "250px" },
        backgroundColor: "#3f7fca19",
        borderRight: "1px solid #e0e0e0",
        padding: "1rem",
      }}
    >
      {/* User Info */}
      <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
        <FaUser className="text-gray-500 text-6xl mx-auto mb-4" />
        <h2 className="text-xl font-bold">Admin</h2>
        <p className="text-gray-600">admin@gmail.com</p>
      </Box>

      <Divider sx={{ marginBottom: "1.5rem" }} />

      {/* Navigation Links */}
      <Stack spacing={2}>
        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => {
              setActiveNavItem(item.label);
              setDrawerOpen(false); // Close drawer on item click
            }}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              textDecoration: "none",
              color: activeNavItem === item.label ? "#1976d2" : "#000",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor:
                activeNavItem === item.label ? "#e3f2fd" : "transparent",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                marginRight: "1rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "50%",
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="body1">{item.label}</Typography>
          </div>
        ))}
      </Stack>

      <button
        className="w-full p-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Hamburger menu for small screens */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            top: "1rem",
            left: "1rem",
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ backgroundColor: "#f5f5f5", borderRadius: "50%" }}
          >
            <FaBars />
          </IconButton>
        </Box>

        {/* Sidebar for larger screens */}
        <Box
          sx={{
            width: { xs: 0, sm: "250px" },
            display: { xs: "none", sm: "block" },
          }}
        >
          {renderSidebarContent()}
        </Box>

        {/* Drawer for small screens */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "1rem",
            }}
          >
            <IconButton onClick={() => setDrawerOpen(false)}>
              <FaTimes />
            </IconButton>
          </Box>
          {renderSidebarContent()}
        </Drawer>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* Render active component */}
          {navItems.find((item) => item.label === activeNavItem)?.component}
        </Box>
      </Box>
    </div>
  );
}

export default AdminSide;
