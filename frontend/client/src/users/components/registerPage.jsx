import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../img/login-img.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  phone: z
    .string()
    .min(11, { message: "Phone Number must be at least 11 characters." }),
  address: z
    .string()
    .min(10, { message: "Address must be atleast 10 characters long" }),
});

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({ resolver: zodResolver(Schema) });
  const [registrationError, setRegistrationError] = useState(null);
  // const history = useHistory(); // Access the history object
  const navigate = useNavigate();

  async function signUp(data) {
    try {
      const response = await fetch("http://localhost:2300/api/v1/auth/signUp", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Registration successful, show success message or redirect to another page
        alert("Registration successful! You can now log in.");
        // Optionally, redirect to the login page
        navigate("/login"); // Use navigate to redirect to '/login'
        // Reset the form and clear input fields
        setRegistrationError("");
      } else {
        // Registration failed, handle error response from the server
        const data = await response.json();
        alert(data.error); // Display the error message sent by the server
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle other errors (e.g., network error)
      setRegistrationError(
        "An error occurred during registration. Please try again later."
      ); // Set the registration error message
    }
  }
  return (
    <div className="login-clip">
      <div className="login-flex-box reg-flex-box">
        <div className="login-img-box">
          <img src={loginImg} alt="login-img" className="login-img" />
        </div>
        <form className="login-container" onSubmit={handleSubmit(signUp)}>
          <h2 className="log2">Sign-up</h2>
          <div>
            <input
              className="input-name"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className="error">{errors.username.message}</p>}
          </div>
          <div>
            <input
              className="input-email"
              id="username"
              placeholder="Full Name"
              type="text"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div>
            <input
              className="input-password"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <div>
            <input
              className="input-password"
              type="password"
              id="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div>
            <input
              className="input-email"
              id="username"
              placeholder="Phone Number"
              type="number"
              {...register("phone")}
            />
            {errors.tel && <p className="error">{errors.tel.message}</p>}
          </div>
          <div>
            <input
              className="input-email"
              id="username"
              placeholder="Address"
              type="text"
              {...register("address")}
            />
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}
          </div>
          {registrationError && (
            <span className="error">{registrationError}</span>
          )}
          <button className="btnReg">Register</button>
          {/* option */}
          <p className="register-question">
            Already have an account? <span className="reg-arrow">⤵</span>
          </p>
          <p className>
            <Link className="reg" to="/login">
              Return to Login page
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
