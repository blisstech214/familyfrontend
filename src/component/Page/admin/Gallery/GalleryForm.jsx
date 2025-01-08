import React, { useState } from "react";
import axios from "axios";

const GalleryForm = () => {
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("family");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("alt", alt);
    formData.append("category", category);
    formData.append("image", imageFile); // Include the image file

    try {
      const response = await axios.post(
        "http://localhost:4000/api/gallery", // Ensure this is the correct backend route
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      alert("Image uploaded successfully!");

      // Reset alt and category state values, and clear the file input field
      setAlt(""); // Reset alt text
      setCategory("family"); // Reset category to default
      setImageFile(null); // Reset image file state

      // Clear the file input field manually
      document.getElementById("file").value = ""; // Reset the file input field
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload the image.");
    }
  };

  return (
    <div className="flex justify-center items-center p-5 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Upload Image
        </h2>

        {/* Alt Text Input */}
        <div className="mb-4">
          <label htmlFor="alt" className="block text-gray-700 font-medium mb-2">
            Alt Text
          </label>
          <input
            type="text"
            id="alt"
            placeholder="Enter alt text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Select */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="family">Family</option>
            <option value="cricket">Cricket</option>
            <option value="events">Events</option>
          </select>
        </div>

        {/* File Input */}
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              const file = e.target.files[0];
              console.log("File selected:", file); // Log the file to see if it's being selected
              setImageFile(file);
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default GalleryForm;
