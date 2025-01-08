import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [Value, setValue] = useState({
    Email: "",
    Password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!Value.Email.includes("@")) {
      formErrors.Email = "Please enter a valid email address.";
    }
    if (Value.Password.length < 6) {
      formErrors.Password = "Password must be at least 6 characters long.";
    }
    return formErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        Value
      );
      const token = res.data.token;
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      setValue({ Email: "", Password: "" });
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        alert(
          `Server error: ${error.response.data.message || "Unknown error"}`
        );
      } else if (error.request) {
        alert("No response from server. Please try again later.");
      } else {
        alert("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100 p-4">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <form
          onSubmit={onSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
            Login
          </h2>
          <input
            type="email"
            placeholder="Email address"
            className={`w-full p-2 md:p-3 border ${
              errors.Email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2`}
            required
            onChange={onChange}
            name="Email"
            value={Value.Email}
          />
          {errors.Email && (
            <p className="text-red-500 text-sm">{errors.Email}</p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full p-2 md:p-3 border ${
                errors.Password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2`}
              required
              onChange={onChange}
              name="Password"
              value={Value.Password}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>
          {errors.Password && (
            <p className="text-red-500 text-sm">{errors.Password}</p>
          )}
          <button
            className="w-full bg-blue-500 text-white p-2 md:p-3 rounded-md shadow-md font-semibold hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Login
          </button>
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center text-gray-600 mt-6">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/reg" className="hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
