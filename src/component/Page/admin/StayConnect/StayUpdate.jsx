
import React, { useState, useEffect } from "react";
import axios from "axios";

function StayUpdate({ editingCard, onClose }) {
  console.log(editingCard, "props data");
  const [formData, setFormData] = useState({
    title: editingCard ? editingCard.title : "",
    description: editingCard ? editingCard.description : "",
    heading: editingCard ? editingCard.heading : "",
  });

  useEffect(() => {
    if (editingCard) {
      setFormData({
        title: editingCard.title,
        description: editingCard.description,
        heading: editingCard.heading,
      });
    }
  }, [editingCard]);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.heading) {
      alert("Please fill out all fields.");
      return;
    }
    console.log(formData, "data fetch");
    try {
      const response = await axios.put(
        `http://localhost:4000/api/eventconnect/${editingCard.cardId}/item/${editingCard.itemId}`,
        formData
      );
      if (response.data?.data) {
        onClose();
      } else {
        alert("Unexpected API response. Please check.");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("Failed to update the card. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center">
          Edit EventConnect
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Title:
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange(e, "title")}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the title"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Description:
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange(e, "description")}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter a detailed description"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Heading:
              </label>
              <input
                type="text"
                value={formData.heading}
                onChange={(e) => handleChange(e, "heading")}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the heading"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto transition duration-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full sm:w-auto transition duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StayUpdate;
