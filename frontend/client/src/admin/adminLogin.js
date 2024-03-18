import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../admin/admin-hero-img.jpeg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import logo from "../users/img/EatRite-logo.png";
import { useAdmin } from "./adminContext";
import Swal from "sweetalert2";

const schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.string(),
});

function AdminLoginPage() {
  const { loginUser } = useAdmin();
  const [loginError, setLoginError] = useState(null);
  const [password, setPassword] = useState("");
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
        data,
        { withCredentials: true }
      );
      if (response.status == 200) {
        // Registration successful, show success message or redirect to another page
        if (response.data.data.user.role == "admin") {
          loginUser(response.data.data.user);
          //alert the user
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 2500,
          });

          navigate("/admin");
          window.location.reload();
          // Reset the form and clear input fields
          setLoginError("");
        } else {
          loginUser(response.data.data.user);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 2500,
          });
          navigate("/restaurant");
          window.location.reload();
        }
      } else if (response.status == 419) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/change-password");
      } else {
        // Registration failed, handle error response from the server
        const data = await response.json();
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.data.message,
          showConfirmButton: false,
          timer: 2500,
        }); // Display the error message sent by the server
      }
      // Handle other errors (e.g., network error)
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        setLoginError(error.response.data.msg); // Set the registration error message
      } else if (error.response.status == 419) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/change-password");
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
              placeholder="email"
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
