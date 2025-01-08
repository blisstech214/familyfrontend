import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import GalleryUpdate from "./GalleryUpdate";
import GalleryForm from "./GalleryForm";

function GalleryShow() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryEndpoint =
          selectedCategory === "all"
            ? `${process.env.REACT_APP_API_BASE_URL}/gallery`
            : `${process.env.REACT_APP_API_BASE_URL}/gallery/category/${selectedCategory}`;

        const response = await axios.get(categoryEndpoint);
        setImages(response.data);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedImage(null);
  };

  const handleImageUpdate = (updatedImage) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image._id === updatedImage._id ? updatedImage : image
      )
    );
    setIsUpdateOpen(false);
  };

  const handleClose = () => {
    setIsUpdateOpen(false);
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/gallery/${id}`);
      setImages(images.filter((image) => image._id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image.");
    }
  };

  const handleEditImage = (image) => {
    setSelectedImage(image);
    setIsUpdateOpen(true);
  };

  const handleCloseUpdateForm = () => {
    setIsUpdateOpen(false);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleImageUploadSuccess = () => {
    setIsFormOpen(false);
    setSelectedCategory("all");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["all", "cricket", "family", "events"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-blue-200 text-blue-800 hover:bg-blue-400"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
        <button
          onClick={handleOpenForm}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
        >
          Gallery Image
        </button>
      </div>

      {/* Images Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading images...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 place-items-center">
          {images.map((image) => (
            <div
              key={image._id}
              className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[200px]"
            >
              {/* Image */}
              <div className="relative w-full h-[200px]">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${image.imageUrl}`}
                  alt={image.alt || "Gallery Image"}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Edit and Delete Buttons */}
              <div className="flex justify-between w-full p-2 bg-gray-100 border-t border-gray-300">
                <button
                  className="flex items-center gap-2 text-green-500 hover:text-green-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditImage(image);
                  }}
                >
                  <FaEdit size={18} />
                  <span className="text-sm font-semibold">Edit</span>
                </button>
                <button
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image._id);
                  }}
                >
                  <FaTrash size={18} />
                  <span className="text-sm font-semibold">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No images available in this category.
        </p>
      )}

      {/* Update Form Modal */}
      {isUpdateOpen && selectedImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="relative w-3/4 max-w-lg p-4 bg-white rounded-lg">
            <button
              onClick={handleCloseUpdateForm}
              className="absolute top-2 right-2 text-white bg-black px-2 py-1 rounded"
            >
              Close
            </button>
            <GalleryUpdate
              image={selectedImage}
              onUpdate={handleImageUpdate}
              onClose={handleClose}
            />
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="relative w-3/4 max-w-lg p-4 bg-white rounded-lg">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-white bg-black px-2 py-1 rounded"
            >
              Close
            </button>
            <GalleryForm onUploadSuccess={handleImageUploadSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryShow;
