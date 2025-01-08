import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Assuming you want edit and delete icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SectionD() {
  const [activeIndex, setActiveIndex] = useState(0); // Default to the first tab
  const [cardData, setCardData] = useState([]); // State to hold API data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/eventconnects`
      );
      console.log("Fetched data:", response.data);

      if (Array.isArray(response.data.data)) {
        setCardData(response.data.data); // Access the 'data' array inside the response
      } else {
        console.error("Expected an array, but got:", response.data.data);
        alert("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false once the data is fetched
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>; // Simple loading state
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>; // Display any error
  }

  // Ensure cardData is not empty and the necessary arrays exist before accessing them
  if (cardData.length === 0 || !cardData[0].items) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gray-50">
      <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            Stay Connected, Stay Together
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side: Titles (Buttons) */}
          <div className="lg:w-1/4 bg-white p-4 shadow-lg rounded-lg max-h-96 lg:max-h-none overflow-y-auto">
            {cardData[0].items.length > 0 &&
              cardData[0].items.map((card, index) => (
                <button
                  key={card.itemId}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 min-h-[3rem] ${
                    index === activeIndex
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500 hover:text-white`}
                  onClick={() => setActiveIndex(index)}
                >
                  {card.title}
                </button>
              ))}
          </div>

          {/* Right side: Content */}
          <div className="lg:w-3/4 bg-white p-6 shadow-lg rounded-lg transition-all duration-300 min-h-[18rem] flex flex-col justify-between">
            {cardData[0].items.length > 0 && (
              <div className="space-y-6">
                {/* Heading */}
                <h5 className="text-lg sm:text-xl font-bold text-gray-900 text-center min-h-[3rem] flex items-center justify-center">
                  {cardData[0].items[activeIndex].heading}
                </h5>
                <hr />
                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base lg:text-lg min-h-[8rem]">
                  {cardData[0].items[activeIndex].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionD;
