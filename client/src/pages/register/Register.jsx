// import React, { useContext, useState } from "react";
// import "./register.css"; 
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   // const [registrationError, setRegistrationError] = useState("");

//   const { loading, error, dispatch } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "REGISTER_START" });
//     try {
//       const res = await axios.post("/auth/register", credentials); // Change the API endpoint to handle registration
//       dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
//       setRegistrationSuccess(true);
//       // setRegistrationError("");
//     } catch (err) {
//       dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
//       // if (err.response.data.message === "User already registered") {
//       //   setRegistrationError("User already registered"); // Set registration error state
//       // } else {
//       //   setRegistrationError(""); // Reset registration error state
//       // }
//     }
//   };

//   return (
//     <div className="register">
//       <div className="rContainer">
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           placeholder="username"
//           id="username"
//           onChange={handleChange}
//           className="rInput"
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           placeholder="email"
//           id="email"
//           onChange={handleChange}
//           className="rInput"
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           onChange={handleChange}
//           className="rInput"
//         />
//         <button disabled={loading} onClick={handleRegister} className="rButton">
//           Register
//         </button>

//         {registrationSuccess && <p>User successfully registered!</p>}
//         {/* {registrationError && <p>{registrationError}</p>} Display registration error message */}
//         {error && <span>{error.message}</span>}

//         <p>
//           Already have an account? <Link to="/login">Login here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useContext, useState } from "react";
import "./register.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      setRegistrationSuccess(true);
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="rInput"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="rInput"
        />

        {/* Add an input for image upload here
        <label htmlFor="img">Profile Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          id="img"
          onChange={handleChange}
          className="rInput"
        /> */}

        <label htmlFor="city">City:</label>
        <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="rInput"
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          placeholder="phone"
          id="phone"
          onChange={handleChange}
          className="rInput"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleRegister} className="rButton">
          Register
        </button>

        {registrationSuccess && <p>User successfully registered!</p>}
        {error && <span>{error.message}</span>}

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

