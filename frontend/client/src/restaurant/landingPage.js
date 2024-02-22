import React, { useState, useEffect } from "react";

const RestaurantLandingPage = () => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [image, setImage] = useState(null);

  const fetchFoods = async () => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT");
      if (response.ok) {
        const data = await response.json();
        setFoods(data);
      } else {
        console.error("Failed to fetch data from the database");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // Simulated API endpoint for fetching data from the database

    fetchFoods();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulated API endpoint for uploading data to the database
    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("price", price);
    formData.append("minPrice", minPrice);
    formData.append("image", image);

    try {
      // Simulate API request using fetch or Axios
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Data successfully uploaded to the database");
        // Refetch the updated list of foods
        fetchFoods();
      } else {
        console.error("Failed to upload data to the database");
        // Additional logic or feedback for failure
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (foodId) => {
    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(`YOUR_API_ENDPOINT/${foodId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Data successfully deleted from the database");
        // Refetch the updated list of foods
        fetchFoods();
      } else {
        console.error("Failed to delete data from the database");
        // Additional logic or feedback for failure
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (food) => {
    // Implement the logic to edit a food item (e.g., redirect to an edit page)
    console.log("Editing food:", food);
  };

  return (
    <div>
      <h1>Restaurant Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Food Name:
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Minimum Price:
          <input
            type="text"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Previously Uploaded Items:</h2>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            {food.foodName} - ${food.price} (Min: ${food.minPrice})
            <button onClick={() => handleDelete(food.id)}>Delete</button>
            <button onClick={() => handleEdit(food)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantLandingPage;
