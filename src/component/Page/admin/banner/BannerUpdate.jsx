import React, { useState, useEffect } from "react";
import axios from "axios";

function BannerUpdate({ bannerId, onClose }) {
  const [formData, setFormData] = useState({
    titles: bannerId ? bannerId.titles : "",
    descriptions: bannerId ? bannerId.descriptions : "",
    image: null, // To store new image file
    existingImage: bannerId ? bannerId.image : null, // To store existing image URL
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (bannerId) {
      setFormData({
        titles: bannerId.titles,
        descriptions: bannerId.descriptions,
        image: null, // Initialize image to null for new uploads
        existingImage: bannerId.image, // Initialize with existing image URL
      });
    }
  }, [bannerId]);

  const handleChange = (e, field) => {
    if (field === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, [field]: file });

      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titles || !formData.descriptions) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("titles", formData.titles);
    updatedData.append("descriptions", formData.descriptions);

    if (formData.image) {
      updatedData.append("image", formData.image);
    } else if (formData.existingImage) {
      updatedData.append("existingImage", formData.existingImage);
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/updateBanner/${bannerId.bannerId}/item/${bannerId.itemId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.data) {
        onClose();
      } else {
        alert("Unexpected API response, please check.");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Failed to update banner. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <input
        type="text"
        value={formData.titles}
        onChange={(e) => handleChange(e, "titles")}
        placeholder="Title"
        className="block w-full border rounded p-2"
        required
      />
      <textarea
        value={formData.descriptions}
        onChange={(e) => handleChange(e, "descriptions")}
        placeholder="Description"
        className="block w-full border rounded p-2"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e, "image")}
        className="block w-full"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-40 object-cover mt-2 rounded-md"
        />
      )}
      {formData.existingImage && !imagePreview && (
        <img
          src={formData.existingImage}
          alt="Existing Banner"
          className="w-full h-40 object-cover mt-2 rounded-md"
        />
      )}
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Close
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default BannerUpdate;
