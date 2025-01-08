import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import React Icons

const json = require("../../../state.json");
console.log(Object.keys(json), "qwefd");

function Registration() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#cce4f7",
      paddingTop: "80px", // Ensure space between navbar and form
      paddingBottom: "40px", // Add space at the bottom
    },
    formContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "100%",
      padding: "10px",
    },
    form: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px", // Reduce width for better alignment
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    inputContainer: {
      position: "relative",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "20px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#2563EB",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
    },
    heading: {
      fontSize: "24px", // Adjust font size for better scaling
      marginBottom: "20px",
      color: "#333",
      fontWeight: "bold",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginTop: "5px",
    },
    loginLink: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
  };

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
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const navigate = useNavigate();

  // Fetch states when country is selected
  useEffect(() => {
    if (Change.Country) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/states/${Change.Country}`)
        .then((res) => setStateOptions(res.data))
        .catch(() => setStateOptions([]));
    }
  }, [Change.Country]);
  console.log(process.env.REACT_APP_API_BASE_URL, "localhost");

  // Fetch cities when state is selected
  useEffect(() => {
    if (Change.State) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/cities/${Change.State}`)
        .then((res) => setCityOptions(res.data))
        .catch(() => setCityOptions([]));
    }
  }, [Change.State]);
  console.log(process.env.REACT_APP_API_BASE_URL, "localhost");

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

    // Submit the form data to your backend
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/register`, Change)
      .then(() => {
        setChange(initialValue);
        alert(
          "Your Registration is successfully completed , wait for the admin approval "
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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={Onclick}>
          <h2 style={styles.heading}>Create an Account</h2>

          <input
            type="text"
            placeholder="First Name"
            name="FirstName"
            style={styles.input}
            required
            onChange={onChange}
            value={Change.FirstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="LastName"
            style={styles.input}
            required
            onChange={onChange}
            value={Change.LastName}
          />
          <input
            type="text"
            placeholder="User Name"
            name="UserName"
            style={styles.input}
            required
            onChange={onChange}
            value={Change.UserName}
          />
          <input
            type="email"
            placeholder="Email"
            name="Email"
            style={styles.input}
            required
            onChange={onChange}
            value={Change.Email}
          />

          {/* Password Input with Eye Icon */}
          <div style={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"} // Show password when true
              placeholder="Password"
              name="Password"
              style={styles.input}
              required
              onChange={onChange}
              value={Change.Password}
            />
            {showPassword ? (
              <FaEyeSlash
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              />
            ) : (
              <FaEye
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Pincode"
            name="Pincode"
            style={styles.input}
            onChange={onChange}
            value={Change.Pincode}
          />
          <select
            name="Country"
            style={styles.input}
            onChange={onChange}
            value={Change.Country}
            required
          >
            <option value="">Select Country</option>
            {/* You would populate countries dynamically */}
            <option value="US">United States</option>
            <option value="IN">India</option>
            {/* Add more countries as needed */}
          </select>

          <select
            name="State"
            style={styles.input}
            onChange={onChange}
            value={Change.State}
            required
          >
            <option value="">Select State</option>
            {Object.keys(json).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="City"
            style={styles.input}
            onChange={onChange}
            value={Change.City}
            required
          >
            <option value="">Select City</option>
            {json[Change.State]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

          <button type="submit" style={styles.button}>
            Register
          </button>

          <p style={styles.loginLink}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
