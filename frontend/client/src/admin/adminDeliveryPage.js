import React, { useState, useEffect } from "react";
import "./superAdmin.css";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";

const schema = z.object({
  name: z.string().min(2),
  tel: z.number().min(1000000000),
  email: z.string().min(2),
});

const AdminDeliveryPage = () => {
  const [delivery, setDelivery] = useState([]);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  //fetch delivery personnel data

  const fetchDelivery = async () => {
    try {
      const response = await fetch("http://localhost:2300/api/v1/restaurants");
      if (response.ok) {
        const data = await response.json();
        setDelivery(data);
      } else {
        setError("Failed to fetch data from the database");
        console.error("Failed to fetch data from the database");
      }
    } catch (error) {
      setError(error.response.data.msg);
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
    try {
      const response = await fetch("http://localhost:5000/api/v1/restaurants", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response.json().then(alert("Registration successful!"));
        // Registration successful, show success message or redirect to another page
        fetchDelivery();
      } else {
        // Registration failed, handle error response from the server
        const data = response.json();
        alert(data.error); // Display the error message sent by the server
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors (e.g., network error)
      setError("An error occurred during login. Please try again later."); // Set the registration error message
    }
  };

  const handleDelete = async (Id) => {
    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(
        `http://localhost:2300/api/v1/delivery/${Id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSelectedId("");
        closeModal2();
        fetchDelivery();
      } else {
        console.error("Failed to delete data from the database");
        alert("Something went wrong, Please try again later");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="restaurant-page-container">
        <h1>Super Admin Page</h1>
        <form onSubmit={handleSubmit(handleAddDelivery)}>
          <label>
            Full Name:
            <input type="text" {...register("name")} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" {...register("email")} />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              type="number"
              {...register("tel", { valueAsNumber: true })}
            />
          </label>
          <br />

          <button
            disabled={!isValid}
            type="submit"
            className={isValid ? "addAdmin-btn" : "addAdmin-btn2"}
            // className="addAdmin-btn"
          >
            Submit
          </button>
        </form>
        <h2>Previously Uploaded Delivery Persons:</h2>
        <div className="main-course3">
          {delivery.map((e) => (
            <div className="overall3">
              <h4 className="dish-name3">{e.name}</h4>
              <div className="description3">
                <p>{e.email}</p>
                <p>{e.tel}</p>
              </div>
              <div className="click-order3">
                <FaTrash
                  className="click-order3-icon"
                  onClick={() => handleDelete(e.id)}
                ></FaTrash>
              </div>
            </div>
          ))}
          <div className="modal-container">
            <Modal
              isOpen={modalOpen2}
              onRequestClose={closeModal2}
              className="modal2"
            >
              <FaXmark
                className="modal-icon"
                onClick={() => setModalOpen2(false)}
              />
              <h3>Delete Product</h3>
              <p>Are you sure you want to delete this item?</p>

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
      </div>
    </>
  );
};

export default AdminDeliveryPage;
