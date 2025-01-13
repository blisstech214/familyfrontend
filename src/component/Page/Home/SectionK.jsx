import React, { useState } from "react";
import axios from "axios";

function SectionK() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to backend
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/sentMail`,
        formData
      );
      alert("Your message has been sent!");
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      }); // Clear the form after submit
    } catch (error) {
      console.error("Error sending message:", error.message);
      alert("Error sending message: " + error.message);
    }
  };

  return (
    <div className="bg-blue-700 p-6 sm:p-10 md:p-14 lg:p-20 rounded-3xl mx-4 sm:mx-12 md:mx-24">
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center mb-6 sm:mb-8">
          Let’s Connect Today
        </h2>

        <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
          {/* Name and Company Fields */}
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            {/* Full Name Field */}
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-white mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full border bg-transparent border-gray-300 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Company Field */}
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-white mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                required
                className="w-full border bg-transparent border-gray-300 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          {/* Email and Phone Fields */}
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            {/* Email Field */}
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                required
                className="w-full border bg-transparent border-gray-300 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Phone Number Field */}
            <div className="w-full sm:w-[48%]">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                required
                className="w-full border bg-transparent border-gray-300 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-white mb-2"
            >
              How can we help?
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="4"
              required
              className="w-full bg-transparent border border-gray-300 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white text-blue-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SectionK;
