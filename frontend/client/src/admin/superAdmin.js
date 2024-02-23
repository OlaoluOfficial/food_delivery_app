import React, { useState, useEffect } from "react";
import data from "./data.json";
import "./superAdmin.css"
import { FaTrash } from "react-icons/fa";

const SuperAdminPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantTel, setRestaurantTel] = useState("");
  const [admin, setAdmin] = useState([]);
  const [error, setError] = useState("");

  const fetchAdmin = async () => {
    // try {
    //   const response = await fetch("");
    //   if (response.ok) {
    //     const data = await response.json();
    //     setFoods(data);
    //   } else {
    //     console.error("Failed to fetch data from the database");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    setAdmin(data);
  };
  useEffect(() => {
    // Simulated API endpoint for fetching data from the database

    fetchAdmin();
  }, []);

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    const dataForm = {
      restaurantName: restaurantName,
      restaurantLocation: restaurantLocation,
      restaurantEmail: restaurantEmail,
      restaurantTel: restaurantTel,
    };

    try {
      const response = await fetch("http://localhost:5000/api/restaurant", {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response.json().then(alert("Registration successful!"));
        // Registration successful, show success message or redirect to another page
        fetchAdmin();

        // You can reset the form after adding the restaurant
        setRestaurantName("");
        setRestaurantLocation("");
        setRestaurantEmail("");
        setRestaurantTel("");
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
      const response = await fetch(`YOUR_API_ENDPOINT/${Id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Data successfully deleted from the database");
        // Refetch the updated list of foods
        fetchAdmin();
      } else {
        console.error("Failed to delete data from the database");
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
        <form onSubmit={handleAddRestaurant}>
          <label>
            Restaurant Name:
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Restaurant Location:
            <input
              type="text"
              value={restaurantLocation}
              onChange={(e) => setRestaurantLocation(e.target.value)}
            />
          </label>
          <br />
          <label>
            Restaurant Email:
            <input
              type="email"
              value={restaurantEmail}
              onChange={(e) => setRestaurantEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Restaurant Tel:
            <input
              type="tel"
              value={restaurantTel}
              onChange={(e) => setRestaurantTel(e.target.value)}
            />
          </label>
          <br />

          <button type="submit" className="addAdmin-btn">
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
                  onClick={() => handleDelete(e.id)}
                ></FaTrash>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuperAdminPage;
