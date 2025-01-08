import React, { useState } from "react";
import axios from "axios";
const GalleryUpdate = ({ image, onUpdate, onClose }) => {
  const [alt, setAlt] = useState(image.alt);
  const [category, setCategory] = useState(image.category);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("alt", alt);
    formData.append("category", category);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/gallery/${image._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onUpdate(response.data.gallery);
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-6">
          Update Image
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Alt Text Input */}
          <div>
            <label
              htmlFor="alt"
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Alt Text
            </label>
            <input
              type="text"
              id="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a descriptive alt text"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="family">Family</option>
              <option value="cricket">Cricket</option>
              <option value="events">Events</option>
            </select>
          </div>

          {/* File Input */}
          <div>
            <label
              htmlFor="file"
              className="block text-sm md:text-base font-medium text-gray-700 mb-1"
            >
              Upload Image (Optional)
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryUpdate;
