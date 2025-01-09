import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const json = require("../../../state.json");

function Registration() {
  const initialValue = {
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
    Password: "",
    Pincode: "",
    Country: "",
    State: "",
    City: "",
  };
  const [Change, setChange] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Change.Country) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/states/${Change.Country}`)
        .then((res) => setStateOptions(res.data))
        .catch(() => setStateOptions([]));
    }
  }, [Change.Country]);

  useEffect(() => {
    if (Change.State) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/cities/${Change.State}`)
        .then((res) => setCityOptions(res.data))
        .catch(() => setCityOptions([]));
    }
  }, [Change.State]);

  const onChange = (e) => {
    setChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Onclick = (e) => {
    e.preventDefault();

    if (!validateEmail(Change.Email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(Change.Password)) {
      setErrorMessage(
        "Password must be 8-14 characters long and include at least one letter, one number, and one special character."
      );
      return;
    }
    if (!Change.State || !Change.City || !Change.Country) {
      setErrorMessage("Please select Country, State, and City.");
      return;
    }

    setErrorMessage("");

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/register`, Change)
      .then(() => {
        setChange(initialValue);
        alert(
          "Your Registration is successfully completed, wait for the admin approval."
        );
        navigate("/");
      })
      .catch((error) => {
        console.error(
          "Error during registration:",
          error.response?.data || error.message
        );
        setErrorMessage("Registration failed. Please try again.");
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,14}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-blue-100 mt-16 pt-20 pb-10">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-min">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={Onclick} className="space-y-4">
          {/* Name Pair */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={Change.FirstName}
              onChange={onChange}
            />
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={Change.LastName}
              onChange={onChange}
            />
          </div>

          {/* Username and Email Pair */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="UserName"
              placeholder="User Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={Change.UserName}
              onChange={onChange}
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={Change.Email}
              onChange={onChange}
            />
          </div>

          {/* Password and Pincode Pair */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                placeholder="Password"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={Change.Password}
                onChange={onChange}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <input
              type="text"
              name="Pincode"
              placeholder="Pincode"
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Change.Pincode}
              onChange={onChange}
            />
          </div>

          {/* Country and State Pair */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="Country"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Change.Country}
              onChange={onChange}
              required
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="IN">India</option>
            </select>

            <select
              name="State"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Change.State}
              onChange={onChange}
              required
            >
              <option value="">Select State</option>
              {Object.keys(json).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City Pair */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="City"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={Change.City}
              onChange={onChange}
              required
            >
              <option value="">Select City</option>
              {json[Change.State]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {/* Placeholder for symmetry */}
            <div />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
