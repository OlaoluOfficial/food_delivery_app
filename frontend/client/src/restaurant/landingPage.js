import React, { useState, useEffect } from "react";
import "./landingPage.css";
import { FaTrash, FaPen } from 'react-icons/fa'
import {useForm} from "react-hook-form"

const RestaurantLandingPage = () => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  // const {register} = useform()

  const fetchFoods = async () => {
    try {
      const response = await fetch("http://localhost:2300/api/v1/products");
      if (response.ok) {
        const data = await response.json();
        setFoods(data.data);
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
    const dataForm = {
      "name": foodName,
      "price": price,
      "minimumPrice": minPrice,
      "image": image,
      "description": desc
    }
    // Simulated API endpoint for uploading data to the database
    const formData = new FormData();
    formData.append("name", foodName);
    formData.append("price", price);
    formData.append("minimumPrice", minPrice);
    formData.append("image", image);
    formData.append("description", desc);
    console.log(formData)

    try {
      // Simulate API request using fetch or Axios
      const response = await fetch("http://localhost:2300/api/v1/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Data successfully uploaded to the database");
        // Refetch the updated list of foods
        fetchFoods();
      } else {
        console.error("Failed to upload data to the database");
        // Additional logic or feedback for failure
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // setFoods([...foods, dataForm]);
    console.log(foods)
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
    <div className="restaurant-page-container">
      <h1>Restaurant Admin Page</h1>
      <form
        onSubmit={handleSubmit}
        action="/upload"
        method="POST"
        encType="multipart/form-data"
      >
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
          Food Description:
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
      <div className="main-course2">
        {foods.map((food) => (
          <div className="overall2">
            <div className="content-box2">
              <img className="img" src={food.image} alt="beans img" />
              <div className="description2">
                <strong className="dish-name2">{food.name}</strong>
                <p className="dish-description2"> {food.description}</p>
              </div>
            </div>
            <div className="dish-name2">
              <p>
                Price: <span>{food.price}</span>
              </p>
              <p>
                Minimum Price: <span>{food.minimumPrice}</span>
              </p>
            </div>
            <div className="click-order2">
              <FaPen
                className="click-order2-icon"
                onClick={() => handleEdit(food)}
              ></FaPen>
              <FaTrash
                className="click-order2-icon"
                onClick={() => handleDelete(food.id)}
              ></FaTrash>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantLandingPage;
