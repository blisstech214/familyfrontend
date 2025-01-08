import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import StayUpdate from "./StayUpdate";

function StayConnectShow() {
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/eventconnects"
      );

      if (Array.isArray(response.data.data)) {
        setCardData(response.data.data);
      } else {
        console.error("Expected an array, but got:", response.data.data);
        alert("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again.");
    }
  };

  const handleEdit = (card, itemId) => {
    const selectedItem = card.items.find((item) => item.itemId === itemId);
    setSelectedCard({
      ...selectedItem,
      cardId: card._id,
    });
    setSelectedItemId(itemId);
  };

  const closeUpdateModal = () => {
    setSelectedCard(null);
    setSelectedItemId(null);
    fetchCards();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.length > 0 &&
          cardData.map(
            (card) =>
              card.items &&
              Array.isArray(card.items) &&
              card.items.length > 0 &&
              card.items.map((item) => (
                <div
                  key={item._id || item.itemId}
                  className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full w-80 min-h-[350px] max-h-[400px]"
                >
                  <h3 className="text-xl text-center font-bold bg-blue-600 text-white py-2 rounded-md flex-grow-0">
                    {item.title}
                  </h3>
                  <h4 className="text-md text-center font-semibold text-green-600 mt-4 flex-grow-0">
                    {item.heading}
                  </h4>
                  <p className="text-gray-700 text-justify mt-4 flex-grow">
                    {item.description}
                  </p>
                  <div className="flex justify-end gap-4 mt-auto">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(card, item.itemId)}
                    >
                      <FaEdit size={20} />
                    </button>
                  </div>
                </div>
              ))
          )}
      </div>

      {/* Update Modal */}
      {selectedCard && (
        <StayUpdate editingCard={selectedCard} onClose={closeUpdateModal} />
      )}
    </div>
  );
}

export default StayConnectShow;
