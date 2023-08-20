import { useContext, useState } from "react";
import "./login.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [credentials, setCredentials] = useState({
      username: undefined,
      password: undefined,
    });

    const {loading,error,dispatch} = useContext(AuthContext);
    
    const navigate = useNavigate()

    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};

const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details});
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
   
  // console.log("user are :",user)

return (
    <div className="login">
  <div className="lContainer">
    <label htmlFor="username">Username:</label>
    <input
      type="text"
      placeholder="username"
      id="username"
      onChange={handleChange}
      className="lInput"
    />
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      placeholder="password"
      id="password"
      onChange={handleChange}
      className="lInput"
    />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}

        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;