import React, { useState, useEffect } from "react";
import "./superAdmin.css";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";
import img from "../users/img/EatRite-logo.png";
import Cookies from "js-cookie";
import AdminLoginPage from "./adminLogin";
import AdminHeader from "./adminHeader";
import { jwtDecode } from "jwt-decode";
import UserTable from "./UserTable";
import Swal from "sweetalert2";
import logo from "../users/img/footer-logo.png";
const schema = z.object({
  username: z.string().min(2),
  phone: z.string().min(11),
  email: z.string().min(2),
  address: z.string().min(2),
});

const AdminDeliveryPage = () => {
  const token = Cookies.get("foodieToken");
  const [isLoggedIn, setIsLoggedIn] = useState(token !== undefined);
  const [delivery, setDelivery] = useState("");
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");
  const [cError, setcError] = useState("");
  const [decode, setDecode] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (token) {
      var decoded = jwtDecode(token);
      setDecode(decoded.user.role);
    }
  }, []);

  //fetch delivery personnel data
  const fetchDelivery = async () => {
    try {
      const response = await fetch(
        "http://localhost:2300/api/v1/users/delivery"
      );
      if (response.ok) {
        const data = await response.json();
        setDelivery(data);
      } else {
        setError("Failed to fetch data from the database");
        console.error("Failed to fetch data from the database");
      }
    } catch (error) {
      setError("Failed to fetch data from the database");
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // Simulated API endpoint for fetching data from the database

    fetchDelivery();
  }, []);

  const openModal2 = (id) => {
    setSelectedId(id);
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setSelectedId("");
    setModalOpen2(false);
  };
  //post request for adding a delivery person
  const handleAddDelivery = async (data) => {
    const Data = { ...data, role: "delivery" };
    try {
      const response = await fetch("http://localhost:2300/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(Data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response.json().then(
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Successful!!",
            showConfirmButton: false,
            timer: 1500,
          })
        );
        reset();
        // Registration successful, show success message or redirect to another page
        fetchDelivery();
      } else {
        // Registration failed, handle error response from the server
        const data = response.json();
        setcError(data.data.Message); // Display the error message sent by the server
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors (e.g., network error)
      setcError("An error occurred during login. Please try again later."); // Set the registration error message
    }
  };

  const handleDelete = async (Id) => {
    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(
        `http://localhost:2300/api/v1/users/deleteUser/${Id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setSelectedId("");
        closeModal2();
        fetchDelivery();
      } else {
        console.error("Failed to delete data from the database");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong, Please try again later",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong, Please try again later",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {decode === "admin" ? (
        <div className="restaurant-page-container">
          <section className="section-admin-hero">
            <AdminHeader />
            <img className="hero-img" src={img} alt="hero-img" />
            <h1 className="heading-primary">SuperAdmin</h1>
          </section>
          {/* THE FORM SECTION */}
          <section className="form-section">
            <svg
              className="hotel-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
            <div className="form-section-container">
              <div className="form-description">
                <h3 className="heading-tertiary">Delivery Management</h3>
                <p>
                  Effectively manage restaurants with the management module. As
                  a Super Admin, you can add new restaurants and track
                  restaurant orders and deliveries. The system also includes
                  features for managing restaurant subscribsion, tracking
                  performance metrics, and facilitating communication between
                  you and the restaurants. →
                </p>
              </div>
              <div className="form-container">
                <fieldset>
                  <legend className="legend">Delivery Manager</legend>

                  <form onSubmit={handleSubmit(handleAddDelivery)}>
                    <ul className="form-list">
                      <li className="form-list-item">
                        <label>Full Name:</label>
                        <input type="text" {...register("username")} />
                      </li>
                      <li className="form-list-item">
                        <label>Email:</label>
                        <input type="email" {...register("email")} />
                      </li>
                      <li className="form-list-item">
                        <label>Address:</label>
                        <input type="text" {...register("address")} />
                      </li>
                      <li className="form-list-item">
                        <label>Phone Number:</label>
                        <input type="number" {...register("phone")} />
                      </li>
                    </ul>
                    {cError && <p className="delivery-error">{cError}</p>}
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="addAdmin-btn"
                      // className="addAdmin-btn"
                    >
                      {isValid ? <>Submit</> : <s>Submit</s>}
                    </button>
                  </form>
                </fieldset>
              </div>
            </div>
          </section>
          <section className="section-dishes">
            <svg
              className="hotel-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
            <h2>Delivery Persons</h2>
            {error && <p className="delivery-error">{error}</p>}
            {delivery.length > 0 ? (
              <div className="main-course3">
                <UserTable userData={delivery} onDelete={openModal2} />

                <div className="modal-container">
                  <Modal
                    isOpen={modalOpen2}
                    onRequestClose={() => setModalOpen2(false)}
                    className="modal2"
                  >
                    <FaXmark
                      className="modal-icon"
                      onClick={() => setModalOpen2(false)}
                    />
                    <h3>Delete Personnel</h3>
                    <p>Are you sure you want to delete this user?</p>

                    <div className="btn-chamber2">
                      <button
                        className="modal-button cnfm"
                        type="submit"
                        onClick={() => handleDelete(selectedId)}
                      >
                        Confirm
                      </button>
                      <button
                        className="modal-button"
                        onClick={() => setModalOpen2(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
            ) : (
              <p className="delivery-error">No Data available</p>
            )}
          </section>
        </div>
      ) : (
        <AdminLoginPage />
      )}
      <footer className="general-footer">
        <div>&copy;Final Year Project</div>
        <div className="footer-logo-box">
          <img className="footer-logo" src={logo} alt="logo" />
        </div>
      </footer>
    </>
  );
};

export default AdminDeliveryPage;
