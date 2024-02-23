// SuperAdminPage.js

import React, { useState } from "react";

const SuperAdminPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");

  const handleAddRestaurant = () => {
    // TODO: Implement logic to add restaurant to the database
    // You may need to make an API call to your server here

    // For this example, we'll just log the details
    console.log(
      `Adding Restaurant - Name: ${restaurantName}, Location: ${restaurantLocation}`
    );

    // You can reset the form after adding the restaurant
    setRestaurantName("");
    setRestaurantLocation("");
  };

  return (
    <div>
      <h1>Super Admin Page</h1>
      <form>
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
        <button type="button" onClick={handleAddRestaurant}>
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default SuperAdminPage;
