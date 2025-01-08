import React, { useEffect, useState } from "react";
import axios from "axios";
import BannerUpdate from "./BannerUpdate";

function ShowBannerDetails() {
  const [banners, setBanners] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null); // To track which item is being edited
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/banners`
      );

      if (Array.isArray(response.data.data)) {
        setBanners(response.data.data); // Adjust to match the structure of your API response
        setError(null); // Reset error state if data fetch is successful
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setError("Failed to load banner details. Please try again later.");
    }
  };

  const updateEdit = (updatedBanner, itemId) => {
    const itemsData = updatedBanner.items.find(
      (item) => item.itemId === itemId
    );
    setSelectedCard({
      ...itemsData,
      bannerId: updatedBanner._id, // Save the banner ID here for later use
    });
    setSelectedItemId(itemId);
  };

  const closeUpdateModal = () => {
    setSelectedCard(null);
    setSelectedItemId(null);
    fetchBanners(); // Refresh banners after edit or add
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Banner Details</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {banners.length > 0 &&
        banners.map((card) => (
          <div
            key={card._id}
            className="flex flex-wrap gap-5 justify-center mb-6"
          >
            {card.items &&
              Array.isArray(card.items) &&
              card.items.length > 0 &&
              card.items.map((item) => (
                <div
                  key={item._id || item.itemId}
                  className="bg-white p-4 shadow-lg rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <div className="space-y-4">
                    <h2 className="text-xl p-2 text-center bg-blue-500 text-white font-semibold mb-2">
                      {item.titles}
                    </h2>
                    <hr />
                    <p className="text-sm text-justify text-gray-600">
                      {item.descriptions}
                    </p>
                  </div>
                  <img
                    src={
                      item.image
                        ? `${process.env.REACT_APP_API_BASE_URL}${item.image}`
                        : "/path/to/default-image.jpg"
                    }
                    alt={item.titles || "Default Title"}
                    className="w-full h-20 object-cover rounded-md mb-4"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={() => updateEdit(card, item.itemId)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}

      {selectedCard && (
        <BannerUpdate
          bannerId={selectedCard} // Correctly pass the banner ID
          onClose={closeUpdateModal} // Close modal and refresh
        />
      )}
    </div>
  );
}

export default ShowBannerDetails;
