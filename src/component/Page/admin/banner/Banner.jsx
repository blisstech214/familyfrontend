import React, { useState } from "react";
import axios from "axios";

function Banner() {
  const [contentDetails, setContentDetails] = useState([
    { titles: "", descriptions: "", image: null },
  ]);
  const [contentCount, setContentCount] = useState(3);

  const handleContentDetails = (event, index) => {
    const { name, value, files } = event.target;
    setContentDetails((prevContentDetails) => {
      const updatedContentDetails = [...prevContentDetails];
      if (!updatedContentDetails[index]) {
        updatedContentDetails[index] = {
          titles: "",
          descriptions: "",
          image: null,
        };
      }
      if (name === "image" && files?.length > 0) {
        updatedContentDetails[index][name] = files[0];
      } else {
        updatedContentDetails[index][name] = value;
      }
      return updatedContentDetails;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify(
        contentDetails.map((detail) => ({
          titles: detail.titles,
          descriptions: detail.descriptions,
        }))
      )
    );

    contentDetails.forEach((detail, index) => {
      if (detail.image) {
        formData.append(`image_${index}`, detail.image);
      }
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/uploadBanner`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data.data, "data post");
      console.log(response.data.message, "data post");

      if (response.data.message) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading banner data:", error);
      alert("Error uploading banner data");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Upload Banner Data
      </h2>
      {Array.from({ length: contentCount }).map((_, index) => {
        const { titles, descriptions, image } = contentDetails[index] || {
          titles: "",
          descriptions: "",
          image: null,
        };
        return (
          <div key={index} className="space-y-4 mb-6">
            <div>
              <input
                type="text"
                value={titles}
                name="titles"
                placeholder={`Title ${index + 1}`}
                onChange={(e) => handleContentDetails(e, index)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                value={descriptions}
                name="descriptions"
                placeholder={`Description ${index + 1}`}
                onChange={(e) => handleContentDetails(e, index)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              />
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => handleContentDetails(e, index)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      })}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Upload
      </button>
    </form>
  );
}

export default Banner;
