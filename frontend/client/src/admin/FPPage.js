import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../users/userContext";
import loginImg from "../users/img/login-img.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AdminLoginPage from "./adminLogin";
import DeliveryLoginPage from "../delivery/delliveryLoginPage";
import Swal from "sweetalert2";

const schema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function FPPage() {
  const token = Cookies.get("foodieToken");
  const [isLoggedIn, setIsLoggedIn] = useState(token !== undefined);
  const [decoded, setDecoded] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaEye className="icons" />);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (token) {
      var decoded = jwtDecode(token);
      setDecoded(decoded.user.role);
    }
  }, []);

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

  async function changePassword(data) {
    try {
      const response = await axios.post(
        "http://localhost:2300/api/v1/auth/changepassword",
        data,
        { withCredentials: true }
      );
      if (response.status == 201) {
        console.log(decoded);
        // Registration successful, show success message or redirect to another page
        if (decoded == "delivery") {
          Swal.fire({
            position: "center",
            icon: "succes",
            title: "Password change successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/delivery/login");
          // Reset the error state
          setLoginError("");
        } else {
          Swal.fire({
            position: "center",
            icon: "succes",
            title: "Password change successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/admin/login");
          // Reset the error state
          setLoginError("");
        }
      } else {
        // Registration failed, handle error response from the server
        const data = await response.json();
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // Display the error message sent by the server
      }
    } catch (error) {
      if (error.response.status == 400) {
        setLoginError(error.response.data.message); // Set the registration error message
      } else {
        setLoginError(error.response.data.message);
        // setLoginError("An error occurred, please try again later");
      }
      // Handle other errors (e.g., network error)
    }
  }
  return (
    <>
      {isLoggedIn ? (
        <div className="login-clip">
          <div className="login-flex-box">
            <div className="login-img-box">
              <img src={loginImg} alt="login-img" className="login-img" />
            </div>
            <form
              onSubmit={handleSubmit(changePassword)}
              className="login-container"
            >
              <h2 className="log">Change Password 🔐</h2>

              <div className="Password-input-container">
                <input
                  className="input-password"
                  type={type}
                  id="password"
                  placeholder="Password"
                  {...register("currentPassword")}
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
              <div className="Password-input-container">
                <input
                  className="input-password"
                  type={type}
                  placeholder="New Password"
                  id="logIn"
                  {...register("newPassword")}
                />
                {icon && <div onClick={handleToggle}>{icon}</div>}
                <div>
                  {errors.newPassword && (
                    <p className="error">{errors.newPassword.message}</p>
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
            </form>
          </div>
        </div>
      ) : decoded == "delivery" ? (
        <DeliveryLoginPage />
      ) : (
        <AdminLoginPage />
      )}
    </>
  );
}

export default FPPage;
