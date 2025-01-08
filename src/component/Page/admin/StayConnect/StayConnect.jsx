import React, { useState } from "react";
import axios from "axios";

function StayConnect() {
  const [formData, setFormData] = useState({
    titles: [
      { id: "id1", value: "" },
      { id: "id2", value: "" },
      { id: "id3", value: "" },
    ],
    descriptions: [
      { id: "id1", value: "" },
      { id: "id2", value: "" },
      { id: "id3", value: "" },
    ],
    heading: [
      { id: "id1", value: "" },
      { id: "id2", value: "" },
      { id: "id3", value: "" },
    ],
  });

  const handleChange = (e, index, field) => {
    const updatedField = [...formData[field]];
    updatedField[index].value = e.target.value;
    setFormData({ ...formData, [field]: updatedField });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate formData
    if (
      !formData.titles?.length ||
      !formData.descriptions?.length ||
      !formData.heading?.length
    ) {
      console.error("Form data is incomplete:", formData);
      alert("Please fill out all required fields.");
      return;
    }

    // Format the data for the API
    const formattedData = formData.titles.map((title, index) => ({
      title: title.value || "",
      description: formData.descriptions[index].value || "",
      heading: formData.heading[index].value || "",
    }));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/eventconnect`,
        { data: formattedData },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.data) {
        setFormData({
          titles: [
            { id: "id1", value: "" },
            { id: "id2", value: "" },
            { id: "id3", value: "" },
          ],
          descriptions: [
            { id: "id1", value: "" },
            { id: "id2", value: "" },
            { id: "id3", value: "" },
          ],
          heading: [
            { id: "id1", value: "" },
            { id: "id2", value: "" },
            { id: "id3", value: "" },
          ],
        });

        alert("Form submitted successfully!");
      } else {
        console.error("Unexpected API response format:", response);
        alert("Unexpected API response. Please check.");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="items-center justify-center flex">
      <form
        onSubmit={handleSubmit}
        className="space-y-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-gray-100 p-8 rounded-lg shadow-lg max-w-2xl w-full"
      >
        <h2 className="text-center text-2xl font-bold mb-6">
          Stay connect events
        </h2>

        {[0, 1, 2].map((index) => (
          <div
            key={formData.titles[index].id}
            className="space-y-4 p-4 border rounded-lg bg-white shadow-sm"
          >
            <div>
              <label className="block font-bold text-gray-700">
                Title {index + 1}:
              </label>
              <input
                type="text"
                value={formData.titles[index].value}
                onChange={(e) => handleChange(e, index, "titles")}
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder={`Enter title ${index + 1}`}
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700">
                Description {index + 1}:
              </label>
              <textarea
                value={formData.descriptions[index].value}
                onChange={(e) => handleChange(e, index, "descriptions")}
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder={`Enter description ${index + 1}`}
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700">
                Heading {index + 1}:
              </label>
              <input
                type="text"
                value={formData.heading[index].value}
                onChange={(e) => handleChange(e, index, "heading")}
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder={`Enter heading ${index + 1}`}
                required
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full font-bold hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default StayConnect;
