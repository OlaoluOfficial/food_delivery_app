import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../users/userContext";
import loginImg from "../admin/admin-hero-img.jpeg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import logo from "../users/img/EatRite-logo.png";

const schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.string(),
});

function AdminLoginPage() {
  const [loginError, setLoginError] = useState(null);
  const [password, setPassword] = useState("");
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
      if (response.status == 200) {
        // Registration successful, show success message or redirect to another page
        alert("Login successful!");
        navigate("/admin");
        // Reset the form and clear input fields
        setLoginError("");
      } else {
        // Registration failed, handle error response from the server
        const data = await response.json();
        alert(data.data.message); // Display the error message sent by the server
      }
      // Handle other errors (e.g., network error)
    } catch (error) {
      if (error.response == 400) {
        setLoginError(error.response.data.msg); // Set the registration error message
      } else {
        setLoginError("An error occurred, please try again later");
      }
    }
  }
  return (
    <div className="login-clip admin-login-clip">
      <div className="login-flex-box">
        <div className="login-img-box">
          <img src={loginImg} alt="login-img" className="login-img" />
        </div>
        <form onSubmit={handleSubmit(login)} className="login-container">
          <h3 className="log">Admin Login 🔐</h3>
          <div className="margin-top margin-bottom">
            <input
              className="input-name "
              type="email"
              placeholder="Username"
              id="logIn"
              {...register("email")}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="Password-input-container margin-bottom">
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
          <div className="input-role">
            <input
              {...register("role", { required: true })}
              type="radio"
              id="roleRestaurant"
              value="restaurant"
            />
            <label htmlFor="roleRestaurant">Restaurant</label>

            <input
              {...register("role", { required: true })}
              type="radio"
              id="roleSuperAdmin"
              value="admin"
            />
            <label htmlFor="roleSuperAdmin">Admin</label>
          </div>
          {loginError && (
            <span className="error password-error">{loginError}</span>
          )}
          {/* <button disabled={!isValid} type="submit" className={ isValid ? "btnLog" : "btnLog2" }>Login</button> */}
          <button type="submit" className="btnLog">
            Login
          </button>
        </form>
      </div>
      <img className="login-logo" src={logo} alt="eatrite" />
    </div>
  );
}

export default AdminLoginPage;
