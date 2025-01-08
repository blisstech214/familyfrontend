import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-3 bg-light w-25">
      <h5>Search Family Profiles</h5>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="btn btn-primary w-100"
        onClick={() => onSearch(searchQuery)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FamilyMembers from "./FamilyMembers";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FaSearch } from "react-icons/fa";

// function Families() {
//   const [userData, setUserData] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user ID
//   const [showFamilyDetails, setShowFamilyDetails] = useState(false); // Track breadcrumb state
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const [visibleFamilies, setVisibleFamilies] = useState([]); // Track visibility for each family

//   useEffect(() => {
//     AOS.init({ duration: 800 });
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/api/userData");
//         const families = res.data.data;
//         setUserData(families);
//         console.log(families, "families");
//         setVisibleFamilies(families.map(() => true)); // Initialize visibility state
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFamilyClick = (id) => {
//     setSelectedUserId(id); // Set the selected user's ID
//     setShowFamilyDetails(true); // Update breadcrumb to show details
//   };

//   const handleBreadcrumbClick = () => {
//     setSelectedUserId(null); // Go back to the families list
//     setShowFamilyDetails(false); // Reset breadcrumb state
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value); // Update search term on input change
//   };

//   const handleDelete = (index) => {
//     setVisibleFamilies((prev) => {
//       const updated = [...prev];
//       updated[index] = false; // Temporarily hide the family item
//       return updated;
//     });
//   };

//   const filteredFamilies = userData.filter((member, index) => {
//     const matchesSearch = member.UserName?.toLowerCase().includes(
//       searchTerm.toLowerCase()
//     );
//     return visibleFamilies[index] && matchesSearch; // Apply visibility and search filter
//   });

//   return (
//     <div className="container mx-auto p-4">
//       {/* Breadcrumbs */}
//       <div className="flex items-center space-x-2 py-4">
//         <span
//           className={`cursor-pointer text-blue-500 hover:underline ${
//             !showFamilyDetails ? "font-bold" : ""
//           }`}
//           onClick={handleBreadcrumbClick}
//         >
//           Families
//         </span>
//         {showFamilyDetails && (
//           <>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-800 font-bold">
//               Family Member Details
//             </span>
//           </>
//         )}
//       </div>
//       <hr className="border-gray-300 mb-4" /> {/* Horizontal Line */}
//       {/* Conditional Search Bar */}
//       {!showFamilyDetails && (
//         <div className="flex justify-center px-7 items-center">
//           <div className="relative w-full">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder="Search..."
//               className="w-full py-4 pl-10 pr-4 bg-ab rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <FaSearch className="absolute left-4 top-7 text-gray-500" />
//           </div>
//         </div>
//       )}
//       {/* Content */}
//       <div className="min-h-screen flex flex-col px-4 mt-4">
//         {selectedUserId ? (
//           <FamilyMembers id={selectedUserId} />
//         ) : (
//           <ul className="w-full">
//             {filteredFamilies.map((member, index) => (
//               <li
//                 key={index}
//                 className="flex items-center justify-between text-lg border border-gray-300 rounded-lg p-4 mb-3 hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
//               >
//                 <div
//                   className="flex items-center space-x-4 cursor-pointer"
//                   onClick={() => handleFamilyClick(member._id)} // Pass the user's ID
//                 >
//                   <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//                     {member.UserName?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                   <span className="font-medium text-gray-800">
//                     {member.UserName || "Unknown User"}
//                   </span>
//                 </div>

//                 <button
//                   onClick={() => handleDelete(index)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Families;
