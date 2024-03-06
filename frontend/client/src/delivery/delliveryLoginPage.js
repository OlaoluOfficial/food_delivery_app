import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../users/userContext";
import loginImg from "./delivery-login-img.jpeg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import logo from "../users/img/EatRite-logo.png";
import AdminContext from "../admin/adminContext";

const schema = z.object({
  email: z.string().min(3, { message: "Email must be at least 3 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function DeliveryLoginPage() {
  const { setAdminInfo, adminInfo } = useContext(AdminContext);
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
    let Data = { ...data, role: "delivery" };
    try {
      const response = await axios.post(
        "http://localhost:2300/api/v1/auth/login",
        Data
      );
      if (response.status == 200) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
        // Registration successful, show success message or redirect to another page
        setAdminInfo(response.data.data.user);
        alert("Login successful!");
        navigate("/delivery");
        window.location.reload();
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
      } else if (error.response.status == 419) {
        alert(error.response.data.msg);
        navigate("/change-password");
      } else {
        setLoginError("An error occurred, please try again later");
      }
      // Handle other errors (e.g., network error)
    }
  }
  return (
    <div className="login-clip delivery-login-clip">
      <div className="login-flex-box">
        <div className="login-img-box">
          <img src={loginImg} alt="login-img" className="login-img" />
        </div>
        <form onSubmit={handleSubmit(login)} className="login-container">
          <h3 className="log">Rider Login 🔐</h3>
          <div className="margin-bottom margin-top">
            <input
              className="input-name"
              type="email"
              placeholder="Email"
              id="logIn"
              {...register("email")}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="Password-input-container margin-bottom">
            <input
              className="input-password "
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
          {loginError && (
            <span className="error password-error">{loginError}</span>
          )}
          {/* <button disabled={!isValid} type="submit" className={ isValid ? "btnLog" : "btnLog2" }>Login</button> */}
          <button type="submit" className="btnLog margin-bottom">
            Login
          </button>
        </form>
      </div>
      <img className="login-logo" src={logo} alt="eatrite" />
    </div>
  );
}

export default DeliveryLoginPage;
