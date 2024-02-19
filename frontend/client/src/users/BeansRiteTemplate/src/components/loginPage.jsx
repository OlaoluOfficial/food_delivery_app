import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../userContext";
import loginImg from "../img/login-img.jpg";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();
    const userData = { username, password };

    // If data is valid, proceed with the registration logic
    setValidationError(null);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
        // Registration successful, show success message or redirect to another page
        alert("Login successful!");
        navigate("/");
        // Reset the form and clear input fields
        setUsername("");
        setPassword("");
        setValidationError("");
        setLoginError("");
      } else {
        // Registration failed, handle error response from the server
        const data = await response.json();
        alert(data.error); // Display the error message sent by the server
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors (e.g., network error)
      setLoginError("An error occurred during login. Please try again later."); // Set the registration error message
    }
  }
  return (
    <div className="login-clip">
      <div className="login-flex-box">
        <div className="login-img-box">
          <img src={loginImg} alt="login-img" className="login-img" />
        </div>
        <form onSubmit={login} className="login-container">
          <h2 className="log">Login 🔐</h2>
          <input
            className="input-name"
            type="text"
            placeholder="username"
            value={username}
            id="logIn"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-password"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationError && <span className="error">{validationError}</span>}
          {loginError && <span className="error">{loginError}</span>}
          <button className="btnLog">Login</button>
          <p className="register-question">
            Don't have an account? <span className="reg-arrow">⤵</span>
          </p>
          <p className>
            <Link className="reg" to="/register">
              Click to register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
