import React, { useState, useEffect } from "react";
import "./superAdmin.css";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "react-modal";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  restaurantName: z.string().min(2),
  restaurantLocation: z.string().min(2),
  restaurantEmail: z.string().min(2),
  restaurantTel: z.number().min(2),
  restaurantDescription: z.string().min(2),
});

const SuperAdminPage = () => {
  const [admin, setAdmin] = useState([]);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const fetchAdmin = async () => {
    try {
      const response = await fetch(
        "http://localhost:2300/api/v1/allrestaurants"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAdmin(data.restaurants);
        console.log(admin);
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

    fetchAdmin();
  }, []);

  const openModal2 = (id) => {
    setSelectedId(id);
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setSelectedId("");
    setModalOpen2(false);
  };

  const handleAddRestaurant = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:2300/api/v1/createrestaurants",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        response.json().then(alert("Registration successful!"));
        // Registration successful, show success message or redirect to another page
        fetchAdmin();
      } else {
        // Registration failed, handle error response from the server
        const data = response.json();
        setError(data.response);
        // alert(data.restaurant.error); // Display the error message sent by the server
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors (e.g., network error)
      // alert(error.response);
      setError("An error occurred during creation. Please try again later."); // Set the registration error message
    }
  };

  //post request for adding a delivery person

  const handleDelete = async (Id) => {
    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(
        `http://localhost:2300/api/v1/deleterestaurant/${Id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Data successfully deleted from the database");
        // Refetch the updated list of foods
        setSelectedId("");
        closeModal2();
        fetchAdmin();
      } else {
        console.error("Failed to delete data from the database");
        alert("Something went wrong, Please try again later");
        // Additional logic or feedback for failure
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="restaurant-page-container">
        <h1>Super Admin Page</h1>
        <form onSubmit={handleSubmit(handleAddRestaurant)}>
          <label>
            Restaurant Name:
            <input type="text" {...register("restaurantName")} />
          </label>
          <br />
          <label>
            Restaurant Location:
            <input type="text" {...register("restaurantLocation")} />
          </label>
          <br />
          <label>
            Restaurant Description:
            <input type="text" {...register("restaurantDescription")} />
          </label>
          <br />
          <label>
            Restaurant Email:
            <input type="email" {...register("restaurantEmail")} />
          </label>
          <br />
          <label>
            Restaurant Tel:
            <input
              type="number"
              {...register("restaurantTel", { valueAsNumber: true })}
            />
          </label>
          <br />

          {error && <p className="error">{error}</p>}
          <button
            disabled={!isValid}
            type="submit"
            className={isValid ? "addAdmin-btn" : "addAdmin-btn2"}
            // className="addAdmin-btn"
          >
            Add Restaurant
          </button>
        </form>

        <h2>Previously Uploaded Admins:</h2>
        <div className="main-course3">
          {admin.map((e) => (
            <div className="overall3">
              <h4 className="dish-name3">{e.name}</h4>
              <div className="description3">
                <p>{e.email}</p>
                <p>{e.tel}</p>
              </div>
              <p className="admin-loc">{e.location}</p>
              <div className="click-order3">
                <FaTrash
                  className="click-order3-icon"
                  onClick={() => openModal2(e._id)}
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

export default SuperAdminPage;
