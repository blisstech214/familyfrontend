import React, { useState } from "react";
import GalleryForm from "./Gallery/GalleryForm";
import StayConnect from "./StayConnect/StayConnect";
import Banner from "./banner/Banner";

function AdminUpdates() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Function to handle button clicks and update the displayed component
  const handleButtonClick = (component, title) => {
    setCurrentComponent(component);
    setBreadcrumbs([title]); // Reset breadcrumbs with the title
  };

  // Function to handle breadcrumb clicks
  const handleBreadcrumbClick = () => {
    setCurrentComponent(null); // Go back to the button selection
    setBreadcrumbs([]); // Reset breadcrumbs
  };

  const renderBreadcrumbs = () => {
    return (
      <div className="breadcrumb-container mb-4">
        {breadcrumbs.length > 0 && (
          <span
            className="breadcrumb text-blue-600 cursor-pointer"
            onClick={handleBreadcrumbClick}
          >
            Button/Banner
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Render Breadcrumbs */}
      {renderBreadcrumbs()}

      {/* Button Section */}
      {currentComponent === null && (
        <div className="button-container flex flex-wrap gap-4 justify-center">
          {/* <button
            onClick={() => handleButtonClick("Banner", "Banner")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 w-full sm:w-auto"
          >
            Show Banner
          </button> */}
          {/* <button
            onClick={() => handleButtonClick("StayConnect", "Stay Connect")}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 w-full sm:w-auto"
          >
            Show Stay Connect
          </button> */}
          <button
            onClick={() => handleButtonClick("GalleryForm", "GalleryForm")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 w-full sm:w-auto"
          >
            Gallery Image
          </button>
          {/* <button
            onClick={() => handleButtonClick("component4", "Component 4")}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-800 transition-all duration-300 w-full sm:w-auto"
          >
            component 4
          </button> */}
        </div>
      )}

      {/* Render the corresponding component based on the button clicked */}
      <div className="component-display mt-8">
        {currentComponent === "Banner" && <Banner />}
        {currentComponent === "StayConnect" && <StayConnect />}
        {currentComponent === "GalleryForm" && <GalleryForm />}
      </div>
    </div>
  );
}

export default AdminUpdates;
