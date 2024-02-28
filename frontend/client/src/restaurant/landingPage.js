import React, { useState, useEffect } from "react";
import "./landingPage.css";
import { FaTrash, FaPen, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const RestaurantLandingPage = () => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

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

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedItem("");
    setModalOpen(false);
  };

  const openModal2 = (id) => {
    setSelectedId(id);
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setSelectedId("");
    setModalOpen2(false);
  };

  const handleSubmits = async (e) => {
    e.preventDefault();
    const dataForm = {
      name: foodName,
      price: price,
      minimumPrice: minPrice,
      image: image,
      description: desc,
    };
    // Simulated API endpoint for uploading data to the database
    const formData = new FormData();
    formData.append("name", foodName);
    formData.append("price", price);
    formData.append("minimumPrice", minPrice);
    formData.append("image", image);
    formData.append("description", desc);
    console.log(formData);

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
    console.log(foods);
  };

  const handleDelete = async (foodId) => {
    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(
        `http://localhost:2300/api/v1/products/${foodId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Data successfully deleted from the database");
        setSelectedId("");
        closeModal2();
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

  const handleEdit = async (data) => {
    // Implement the logic to edit a food item (e.g., redirect to an edit page)
    try {
      // Simulate API request using fetch or Axios
      const response = await fetch(
        `http://localhost:2300/api/v1/products/${selectedId.id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      if (response.ok) {
        alert("Data successfully uploaded to the database");
        setSelectedItem("");
        closeModal();
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

  return (
    <div className="restaurant-page-container">
      <h1>Restaurant Admin Page</h1>
      <form
        onSubmit={handleSubmits}
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
                onClick={() => openModal(food)}
              ></FaPen>
              <FaTrash
                className="click-order2-icon"
                onClick={() => openModal2(food.id)}
              ></FaTrash>
            </div>
          </div>
        ))}
        <div className="modal-container">
          <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            className="modal"
          >
            <FaXmark
              className="modal-icon"
              onClick={() => setModalOpen(false)}
            />
            <h3>Edit Product</h3>
            <form onSubmit={handleSubmit(handleEdit)} className="modal-form">
              <input
                className="modal-input"
                type="text"
                value={selectedItem.name}
                readOnly
              />
              <br />
              <input
                className="modal-input"
                type="text"
                placeholder="Description"
                {...register("description")}
              />
              <br />
              <input
                className="modal-input"
                type="number"
                placeholder="Price"
                {...register("price")}
              />
              <br />
              <input
                className="modal-input"
                type="number"
                placeholder="Minimum Price"
                {...register("minimumPrice")}
              />
              {error && (
                <p className="error">{error}</p>
              )}

              <div className="btn-chamber">
                <button className="modal-button cnfm" type="submit">
                  Confirm
                </button>
                <button
                  className="modal-button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        </div>

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
  );
};

export default RestaurantLandingPage;
