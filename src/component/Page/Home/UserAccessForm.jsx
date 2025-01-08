import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Searching from "./Searching";

function UserAccessForm() {
  const [Value, setValue] = useState({
    UserName: "",
    Email: "",
    Password: "",
  });
  const [errors, setErrors] = useState({});
  const [isValidUser, setIsValidUser] = useState(false);
  const [serverError, setServerError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!Value.UserName && !Value.Email) {
      newErrors.general = "Either Username or Email is required.";
    }
    if (!Value.Password) {
      newErrors.Password = "Password is required.";
    }
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerError("");

    try {
      // Prepare the payload with either Username or Email
      const payload = {
        Username: Value.UserName || undefined,
        Email: Value.Email || undefined,
        Password: Value.Password,
      };

      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, payload);
      if (res.status === 200) {
        setIsValidUser(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setServerError(error.response.data.message || "Invalid credentials.");
      } else {
        setServerError("Something went wrong. Please try again later.");
      }
    }
  };

  if (isValidUser) {
    return <Searching />;
  }

  return (
    <div className="flex flex-col items-center justify-center shadow-md rounded-lg w-full p-8 ">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6 py-3 text-green-800">
        Access Family Group & Family Members Details
      </h2>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        {/* Input Fields - Username, Email, Password */}
        <div className="flex space-x-4 mb-4">
          {/* Username Input */}
          <div className="flex-1">
            <label
              htmlFor="UserName"
              className="block text-sm font-medium text-gray-700"
            >
              Username (optional)
            </label>
            <input
              type="text"
              id="UserName"
              name="UserName"
              value={Value.UserName}
              onChange={onChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Input */}
          <div className="flex-1">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email (optional)
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={Value.Email}
              onChange={onChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={Value.Password}
            onChange={onChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.Password && (
            <p className="text-red-500 text-sm mt-1">{errors.Password}</p>
          )}
        </div>

        {/* General Validation Error */}
        {errors.general && (
          <p className="text-red-500 text-sm text-center">{errors.general}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all"
        >
          Submit
        </button>

        {/* Server Error */}
        {serverError && (
          <p className="text-red-500 text-center text-sm mt-4">{serverError}</p>
        )}
      </form>

      {/* Horizontal Line */}
      <hr className="my-6 border-gray-300 w-full" />
      <div className="text-center text-sm text-gray-600">
        <p>
          <Link
            to="/forgot-password"
            className="text-blue-500 underline hover:underline"
          >
            forgot Password
          </Link>
        </p>
      </div>
      {/* Register Link */}
      <div className="text-center py-3 text-sm text-gray-600">
        <p className="flex gap-3">
          <h1>Don't have an account ?</h1>
          <Link to="/reg" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserAccessForm;
