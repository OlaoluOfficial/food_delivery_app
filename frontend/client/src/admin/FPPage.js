import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../users/userContext";
import loginImg from "../users/img/login-img.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const schema = z.object({
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function FPPage() {
  const [loginError, setLoginError] = useState(null);
  const { setUserInfo } = useContext(UserContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaEye className="icons" />);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  //password toggle function
  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaEyeSlash className="icons" />);
      setType("text");
    } else {
      setIcon(<FaEye className="icons" />);
      setType("password");
    }
  };

  async function login(data) {
    try {
      const response = await axios.post(
        "http://localhost:2300/api/v1/auth/login",
        data
      );
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
        // Registration successful, show success message or redirect to another page
        alert("Login successful!");
        navigate("/restaurant");
        // Reset the form and clear input fields
        setLoginError("");
      } else {
        // Registration failed, handle error response from the server
        const data = await response.json();
        alert(data.data.message); // Display the error message sent by the server
      }
    } catch (error) {
      if (error.response.status == 400) {
        setLoginError(error.response.data.msg); // Set the registration error message
      } else {
        setLoginError("An error occurred, please try again later");
      }
      // Handle other errors (e.g., network error)
    }
  }
  return (
    <div className="login-clip">
      <div className="login-flex-box">
        <div className="login-img-box">
          <img src={loginImg} alt="login-img" className="login-img" />
        </div>
        <form onSubmit={handleSubmit(login)} className="login-container">
          <h2 className="log">Login 🔐</h2>

          <div className="Password-input-container">
            <input
              className="input-password"
              type={type}
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            {icon && <div onClick={handleToggle}>{icon}</div>}
            <div>
              {errors.password && (
                <p className="error password-error">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              className="input-name"
              type={type}
              placeholder="Confirm Password"
              id="logIn"
              {...register("confirmPassword")}
            />
            {icon && <div onClick={handleToggle}>{icon}</div>}
            <div>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          {loginError && (
            <span className="error password-error">{loginError}</span>
          )}
          {/* <button disabled={!isValid} type="submit" className={ isValid ? "btnLog" : "btnLog2" }>Login</button> */}
          <button type="submit" className="btnLog">
            Change Password
          </button>
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

export default FPPage;
