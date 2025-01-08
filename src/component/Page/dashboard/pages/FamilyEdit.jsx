// import React, { useState, useEffect } from "react";
// import { FaEdit, FaSave, FaTrash, FaUser } from "react-icons/fa";
// import axios from "axios";
// import { Box, CircularProgress } from "@mui/material"; // Import CircularProgress for loading spinner
// import AOS from "aos";
// import "aos/dist/aos.css";

// function FamilyEdit() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState();
//   const [newImage, setNewImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState();
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   useEffect(() => {
//     AOS.init({ duration: 1000 });

//     const fetchData = async () => {
//       const token = sessionStorage.getItem("token");
//       if (!token) {
//         setError("No token found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_BASE_URL}/user`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setUserData(res.data);
//       } catch (err) {
//         setError("Error fetching data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSaveClick = async () => {
//     setSaving(true);
//     setError(null);
//     const token = sessionStorage.getItem("token");

//     const formData = new FormData();
//     formData.append("userName", newUserName);
//     if (newImage) {
//       formData.append("image", newImage);
//     }

//     try {
//       const res = await axios.put(
//         "http://localhost:4000/api/user/update-profile",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setUserData((prev) => ({
//         ...prev,
//         UserName: res.data.updatedUserName,
//         ImageUrl: res.data.updatedImageUrl,
//       }));

//       setPreviewImage(res.data.updatedImageUrl || "");
//       setIsEditing(false);
//     } catch (err) {
//       setError("Failed to update profile. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDeleteImage = async () => {
//     const token = sessionStorage.getItem("token");

//     try {
//       await axios.delete(
//         "http://localhost:4000/api/user/delete-profile-image",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUserData((prev) => ({ ...prev, ImageUrl: null }));
//       setPreviewImage(null);
//     } catch (err) {
//       setError("Failed to delete image. Please try again.");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewImage(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <CircularProgress /> {/* Replace with text if needed */}
//         <p className="ml-4">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
//         {previewImage ? (
//           <img
//             src={previewImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
//           />
//         ) : (
//           <FaUser className="text-gray-500 text-6xl mx-auto mb-4" />
//         )}

//         <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
//           <FaUser className="text-gray-500 text-6xl mx-auto mb-4" />
//           <h2 className="text-xl font-bold">{userData?.UserName}</h2>
//           <p className="text-gray-600">{userData?.Email}</p>
//         </Box>

//         {isEditing && (
//           <div>
//             <input type="file" onChange={handleImageChange} className="mb-2" />
//             {previewImage && (
//               <button
//                 onClick={handleDeleteImage}
//                 className="p-2 bg-red-500 text-white rounded"
//               >
//                 <FaTrash /> Delete Image
//               </button>
//             )}
//           </div>
//         )}

//         {isEditing ? (
//           <input
//             type="text"
//             value={newUserName}
//             onChange={(e) => setNewUserName(e.target.value)}
//             className="p-2 border rounded w-full"
//           />
//         ) : (
//           <h2 className="text-xl font-bold">
//             {userData?.UserName || "No Name"}
//           </h2>
//         )}
//         <p className="text-gray-600">{userData?.Email || "No Email"}</p>
//       </Box>

//       {isEditing ? (
//         <button
//           onClick={handleSaveClick}
//           className="p-2 bg-blue-500 text-white rounded mt-2"
//           disabled={saving}
//         >
//           <FaSave /> {saving ? "Saving..." : "Save"}
//         </button>
//       ) : (
//         <FaEdit
//           onClick={handleEditClick}
//           className="text-gray-500 text-2xl cursor-pointer mx-auto"
//         />
//       )}
//  {/* User Info */}
//       <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
//         <FaUser className="text-gray-500 text-6xl mx-auto mb-4" />
//         <h2 className="text-xl font-bold">{userData?.UserName}</h2>
//         <p className="text-gray-600">{userData?.Email}</p>
//       </Box>
//     </div>
//   );
// }

// export default FamilyEdit;
