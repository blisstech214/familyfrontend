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

  // Fetch member data when the component mounts or the id changes
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/getById/${id}` // Replace with your actual endpoint
        );
        const imageUrl = `${process.env.REACT_APP_API_BASE_URL}${res.data.data.image}`; // Assuming the base URL is set in your environment variables
        setMember({
          ...res.data.data,
          image: imageUrl, // Set the full image URL for preview
        });
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [id]);

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
      // Create a temporary URL for the selected image file
      const imageUrl = URL.createObjectURL(file);

      // Set the image URL to state
      setMember((prevState) => ({
        ...prevState,
        image: imageUrl, // Store the temporary URL for preview
      }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("familyId", member.familyId);
    formData.append("name", member.name);
    formData.append("dob", member.dob);
    formData.append("gender", member.gender);
    formData.append("maritalStatus", member.maritalStatus);
    formData.append("education", member.education);
    formData.append("employmentStatus", member.employmentStatus);
    formData.append("contactEmail", member.contactEmail);
    formData.append("contactPhone", member.contactPhone);
    formData.append("occupation", member.occupation);

    // If there's an image, append it as a file object
    if (member.image && typeof member.image !== "string") {
      formData.append("image", member.image); // Use the file object if it's a new image
    }

    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/familyMemUpdate/${id}`,
        formData
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Form submitted successfully!");
          console.log("Updated Data:", res.data.data);

          setIsFormVisible(false);

          if (props.onUpdate) {
            props.onUpdate(res.data.data);
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
                value={member.name}
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
                Occupation
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

            {/* Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                aria-label="Image"
                className="w-full px-4 py-2 border text-center border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Image Preview */}
              {member.image && (
                <div className="mt-2">
                  <img
                    src={member.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover  text-center rounded-full"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update Member
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-lg">Family Member Updated!</p>
      )}
    </div>
  );
}

export default FamMemUpdate;
