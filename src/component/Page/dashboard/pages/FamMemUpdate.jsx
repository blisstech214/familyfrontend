import React, { useState, useEffect } from "react";
import axios from "axios";

function FamMemUpdate(props) {
  console.log(props, "props");
  const id = props.customerId;
  console.log(id, "id update");

  const initialMem = {
    name: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    education: "",
    employmentStatus: "",
    contactEmail: "",
    contactPhone: "",
    occupation: "",
    image: "", // Added image property to form data
  };

  const [member, setMember] = useState(initialMem);
  const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMember((prevState) => ({
          ...prevState,
          image: reader.result, // Store the image data URL
        }));
      };
      reader.readAsDataURL(file); // Convert the image to base64 format
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/getById/${id}`)
      .then((res) => {
        if (res && res.data && res.data.data) {
          setMember(res.data.data); // Ensure you handle valid responses only
          console.log("Fetched Data:", res.data.data);
        } else {
          console.error("Invalid API response:", res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching family member:", error);
      });
  }, [id]); // Add customerId to the dependency array

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/familyMemUpdate/${id}`,
        member
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Form submitted successfully!");
          console.log("Updated Data:", res.data.data);

          // Hide the form and show updated information in the UI
          setIsFormVisible(false);

          // Optionally: Update parent component state or context to reflect the updated data immediately
          if (props.onUpdate) {
            props.onUpdate(res.data.data); // Assuming the parent component has an `onUpdate` callback
          }
        } else {
          alert("Failed to submit form. Please try again.");
          console.error("API Error Response:", res);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      {isFormVisible ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Family Member Form
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={member && member.name}
                onChange={handleChange}
                aria-label="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={member.dob}
                onChange={handleChange}
                aria-label="Date of Birth"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={member.gender}
                onChange={handleChange}
                aria-label="Gender"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="maritalStatus"
              >
                Marital Status
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={member.maritalStatus}
                onChange={handleChange}
                aria-label="Marital Status"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {/* Education Level */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="education"
              >
                Education Level
              </label>
              <select
                id="education"
                name="education"
                value={member.education}
                onChange={handleChange}
                aria-label="Education Level"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Education Level</option>
                <option value="High School">High School</option>
                <option value="College Graduate">College Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            {/* Employment Status */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="employmentStatus"
              >
                Employment Status
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={member.employmentStatus}
                onChange={handleChange}
                aria-label="Employment Status"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Employment Status</option>
                <option value="Employed">Employed</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* Contact Email */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="contactEmail"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={member.contactEmail}
                onChange={handleChange}
                aria-label="Contact Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Contact Phone */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="contactPhone"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={member.contactPhone}
                onChange={handleChange}
                aria-label="Contact Phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Occupation */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="occupation"
              >
                Occupation (Optional)
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={member.occupation}
                onChange={handleChange}
                aria-label="Occupation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="image">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Display Image Preview */}
            {member.image && (
              <div className="mb-4">
                <img
                  src={member.image}
                  alt="Uploaded Preview"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Updated Information:</h3>
          <p>
            <strong>Name:</strong> {member.name}
          </p>
          <p>
            <strong>Date of Birth:</strong> {member.dob}
          </p>
          {/* Display other updated info here */}
        </div>
      )}
    </div>
  );
}

export default FamMemUpdate;
