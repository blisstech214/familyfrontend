import React, { useState } from "react";

function Familiy() {
  const [familyData, setFamilyData] = useState({
    familyId: "",
    familyName: "",
    primaryContact: "",
    secondaryContact: "",
    familyAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamilyData({
      ...familyData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API or display it
    console.log(familyData);
  };

  return (
    <div>
      <h2>Family Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="familyId">Family ID:</label>
          <input
            type="text"
            id="familyId"
            name="familyId"
            value={familyData.familyId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="familyName">Family Name:</label>
          <input
            type="text"
            id="familyName"
            name="familyName"
            value={familyData.familyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="primaryContact">Primary Contact Number:</label>
          <input
            type="text"
            id="primaryContact"
            name="primaryContact"
            value={familyData.primaryContact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="secondaryContact">Secondary Contact Number:</label>
          <input
            type="text"
            id="secondaryContact"
            name="secondaryContact"
            value={familyData.secondaryContact}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="familyAddress">Family Address:</label>
          <textarea
            id="familyAddress"
            name="familyAddress"
            value={familyData.familyAddress}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Family Information</button>
      </form>
    </div>
  );
}

export default Familiy;
