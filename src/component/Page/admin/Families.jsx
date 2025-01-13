import React, { useEffect, useState } from "react";
import axios from "axios";
import FamilyMembers from "./FamilyMembers";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch } from "react-icons/fa";

function Families() {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user ID
  const [showFamilyDetails, setShowFamilyDetails] = useState(false); // Track breadcrumb state
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [visibleFamilies, setVisibleFamilies] = useState([]); // Track visibility for each family

  useEffect(() => {
    AOS.init({ duration: 800 });
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/userData`
        );
        const families = res.data.data;
        console.log(`Fetched ${families.length} families:`, families); // Log the count and data
        setUserData(families);
        setVisibleFamilies(families.map(() => true)); // Initialize visibility state
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  const handleFamilyClick = (id) => {
    setSelectedUserId(id); // Set the selected user's ID
    console.log("Selected User ID:", id); // Log the selected ID
    setShowFamilyDetails(true); // Update breadcrumb to show details
  };

  const handleBreadcrumbClick = () => {
    setSelectedUserId(null); // Go back to the families list
    setShowFamilyDetails(false); // Reset breadcrumb state
  };

  const handleDelete = (index) => {
    setVisibleFamilies((prev) => {
      const updated = [...prev];
      updated[index] = false; // Temporarily hide the family item
      return updated;
    });
  };

  const filteredFamilies = userData.filter((member, index) => {
    const matchesSearch = member.UserName?.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    return visibleFamilies[index] && matchesSearch; // Apply visibility and search filter
  });

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 py-4 flex-wrap">
        <span
          className={`cursor-pointer text-blue-500 hover:underline ${
            !showFamilyDetails ? "font-bold" : ""
          } text-xs sm:text-sm md:text-base lg:text-lg`}
          onClick={handleBreadcrumbClick}
        >
          Families
        </span>
        {showFamilyDetails && (
          <>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-bold text-xs sm:text-sm md:text-base lg:text-lg">
              Family Member Details
            </span>
          </>
        )}
      </div>
      <hr className="border-gray-300 mb-4" /> {/* Horizontal Line */}
      {/* Conditional Search Bar */}
      {!showFamilyDetails && (
        <div className="flex justify-center px-3 sm:px-7 items-center mb-4">
          <div className="relative w-full max-w-md sm:max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full py-2 sm:py-3 pl-10 pr-4 bg-ab rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm md:text-base"
            />
            <FaSearch className="absolute left-3 sm:left-4 top-2 sm:top-3 text-gray-500 text-xs sm:text-sm md:text-base" />
          </div>
        </div>
      )}
      {/* Content - Conditional Rendering */}
      {showFamilyDetails ? (
        <FamilyMembers id={selectedUserId} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {filteredFamilies.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between cursor-pointer bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => handleFamilyClick(member._id)}
            >
              {/* Family Card */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white sm:text-base md:text-xl">
                {member.UserName?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="font-medium text-gray-800 text-xs sm:text-sm md:text-base mt-2">
                {member.UserName || "Unknown User"}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-red-600 transition-all mt-3 sm:mt-4 text-xs sm:text-sm md:text-base"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Families;
