import React, { useState } from "react";
import axios from "axios";

function FamilyMemberForm(props) {
  console.log("userId", props.familyId);

  const [imageFile, setImageFile] = useState(); // Store the image file
  const [loading, setLoading] = useState(false);
  const initialMem = {
    familyId: props.familyId,
    name: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    education: "",
    employmentStatus: "",
    contactEmail: "",
    contactPhone: "",
    occupation: "",
    image: "",
  };
  const [formData, setFormData] = useState(initialMem);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure the `id` value remains static and isn't overwritten by form changes
    if (name !== "id") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    debugger;

    if (file) {
      if ((file.size / (1024 * 1024)).toFixed(2) <= 3) {
        setImageFile(file);
      } else {
        console.log("file not found");
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object to handle file uploads
    const formDataToSubmit = new FormData();

    // Append all form data except `id` dynamically
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    if (imageFile) {
      formDataToSubmit.append("image", imageFile); // Append the image file
    }
    console.log("form", formData.familyId);
    console.log(formDataToSubmit, "datasubmit");
    debugger;
    axios

      .post(
        `${process.env.REACT_APP_API_BASE_URL}/familyMemForm`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Form submitted successfully!");
          setFormData(initialMem); // Reset form data
          setImageFile(); // Reset image file
          window.location.reload(); // Reload the page
        } else {
          alert("Failed to submit form. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
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
            value={formData.name}
            onChange={handleChange}
            aria-label="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            value={formData.dob}
            onChange={handleChange}
            aria-label="Date of Birth"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            aria-label="Gender"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            value={formData.maritalStatus}
            onChange={handleChange}
            aria-label="Marital Status"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
          <label className="block text-sm font-medium mb-2" htmlFor="education">
            Education Level
          </label>
          <select
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            aria-label="Education Level"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            value={formData.employmentStatus}
            onChange={handleChange}
            aria-label="Employment Status"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            value={formData.contactEmail}
            onChange={handleChange}
            aria-label="Contact Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            value={formData.contactPhone}
            onChange={handleChange}
            aria-label="Contact Phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
            value={formData.occupation}
            onChange={handleChange}
            aria-label="Occupation"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Other form fields... */}

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
          <span className="text-[12px]">Image should be less than 3MB </span>
        </div>
        {/* Display Image Preview */}
        {imageFile && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(imageFile)} // Preview the selected image
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FamilyMemberForm;
