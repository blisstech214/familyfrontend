import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUser, FaBars } from "react-icons/fa";
import { Box, Stack, Typography, Divider, IconButton } from "@mui/material";
import FamilyEdit from "./FamilyEdit";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import FamilyUI from "./FamilyUI";
import Searching from "../../Home/Searching";

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState("Family Members");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(res.data);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const navItems = [
    // {
    //   label: "Overview",
    //   icon: <DashboardIcon />,
    //   component: <h1>Overview Content</h1>,
    // },
    {
      label: "Family Members",
      icon: <PeopleIcon />,
      component: <FamilyUI familyId={userData?.userId || 0} />,
    },
    {
      label: "Find Families",
      icon: <IntegrationInstructionsIcon />,
      component: <Searching />,
    },
    // { label: "Settings", icon: <SettingsIcon />, component: <FamilyEdit /> },
  ];

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Hamburger Icon for Small Screens */}
      <IconButton
        sx={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 1001, // Ensure it's above other elements
          display: { xs: "block", md: "none" },
        }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={24} />
      </IconButton>

      {/* Sidebar */}
      <Box
        sx={{
          position: "fixed", // Ensure the sidebar appears above other content
          height: "100vh",
          width: { xs: isSidebarOpen ? "250px" : "0", md: "250px" },
          backgroundColor: "#3f7fca19",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e0e0e0",
          padding: { xs: isSidebarOpen ? "1rem" : "0", md: "1rem" },
          overflowX: "hidden",
          overflowY: "auto", // Ensure scrolling if the content exceeds the screen height
          transition: "all 0.3s ease-in-out",
          zIndex: 1000, // Ensure it's above other elements
        }}
      >
        {/* User Info */}
        <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
          <FaUser className="text-gray-500 text-6xl mx-auto mb-4" />
          <h2 className="text-xl font-bold">{userData?.UserName}</h2>
          <p className="text-gray-600">{userData?.Email}</p>
        </Box>

        <Divider sx={{ marginBottom: "1.5rem" }} />

        {/* Navigation Links */}
        <nav>
          <Stack spacing={2}>
            {navItems.map((item) => (
              <div
                key={item.label}
                onClick={() => {
                  setActiveNavItem(item.label);
                  if (isSidebarOpen) setIsSidebarOpen(false); // Close sidebar after selection
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
            className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </nav>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          marginLeft: { xs: isSidebarOpen ? "250px" : "0", md: "250px" },
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {navItems.find((item) => item.label === activeNavItem)?.component}
      </Box>
    </Box>
  );
};

export default Sidebar;
