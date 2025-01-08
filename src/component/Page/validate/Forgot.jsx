import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forgotPassword`, {
        Email: email,
      });
      setMessage(response.data);
      console.log("Response Data:", response.data);
    } catch (error) {
      setMessage("Error sending reset link");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="flex flex-col items-center w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold  text-black w-full py-3 text-center rounded-md">
          Forgot Password
        </h2>
        <span>Enter Registered Email or Sign Up</span>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          />
          <button
            type="submit"
            className="p-3 text-black font-semibold text-base rounded-md transition duration-200"
          >
            Send Link
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 font-medium ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <a
          className="underline transition duration-200"
          href="https://mail.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to mail
        </a>
        <Link to="/reg" className="underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Forgot;
