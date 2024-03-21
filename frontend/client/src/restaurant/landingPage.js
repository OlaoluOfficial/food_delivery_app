import React, { useState, useEffect } from "react";
import "./landingPage.css";
import { FaTrash, FaPen, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import AdminLoginPage from "../admin/adminLogin";
import { jwtDecode } from "jwt-decode";
import AdminHeader from "../admin/adminHeader";
import Swal from "sweetalert2";
import axios from "axios";
import logo from "../users/img/footer-logo.png";

const schema = z.object({
  description: z.string(),
  price: z.number(),
  minimumPrice: z.number(),
});

const RestaurantLandingPage = () => {
  const token = Cookies.get("foodieToken");
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");
  const [fetError, setFetError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [decode, setDecode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (token) {
      var decoded = jwtDecode(token);
      setDecode(decoded.user.role);
    }
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2300/api/v1/restaurants/products",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setFoods(response.data.products);
      } else {
        console.error("Failed to fetch data from the database");
        setFetError(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setFetError(error.response.data.message);
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

    if (
      foodName == "" ||
      price == "" ||
      desc == "" ||
      image == "" ||
      minPrice == ""
    ) {
      setError("Please fill out all input fields");
    } else {
      // Simulated API endpoint for uploading data to the database
      const formData = new FormData();
      formData.append("name", foodName);
      formData.append("price", price);
      formData.append("minimumPrice", minPrice);
      formData.append("productImages", image);
      formData.append("description", desc);
      console.log(formData);

      try {
        // Simulate API request using fetch or Axios
        const response = await axios.post(
          "http://localhost:2300/api/v1/restaurants/addProducts",
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.status == 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          // Refetch the updated list of foods
          fetchFoods();
          setFoodName("");
          setDesc("");
          setPrice("");
          setMinPrice("");
          setImage(null);
        } else {
          setError("Failed to upload data to the database");
          // console.error("Failed to upload data to the database");
          // Additional logic or feedback for failure
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDelete = async (foodId) => {
    try {
      // Simulated API endpoint for deleting data from the database
      const response = await fetch(
        `http://localhost:2300/api/v1/products/${foodId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setSelectedId("");
        closeModal2();
        // Refetch the updated list of foods
        fetchFoods();
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong, Please try again later",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
        timer: 1500,
      });
      console.error("Error:", error);
    }
  };

  const handleEdit = async (data) => {
    console.log(data);
    // Implement the logic to edit a food item (e.g., redirect to an edit page)
    try {
      // Simulate API request using fetch or Axios
      const response = await axios.put(
        `http://localhost:2300/api/v1/products/${selectedItem._id}`,
        data,
        { withCredentials: true }
      );

      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data successfully updated in the database",
          showConfirmButton: false,
          timer: 1500,
        });
        setSelectedItem("");
        closeModal();
        // Refetch the updated list of foods
        fetchFoods();
      } else {
        setUpdateError("Something went wrong, Please try again later");
        console.error("Failed to upload data to the database");
        // Additional logic or feedback for failure
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
        timer: 1500,
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      {decode === "restaurant" ? (
        <div className="restaurant-page-container">
          <section className="admin-hero-section">
            <AdminHeader />
            <h2 className="admin-primary-heading">
              Restaurant Admin Page
              <span className="primary-heading-paragraph">
                Welcome to the restaurant admin page! We provide restaurant
                owners and managers with everything they need to efficiently
                manage their establishment's operations, from menu updates to
                table reservations and beyond.{" "}
                <em>&ndash;&ndash;powered by EatRite</em>
              </span>
            </h2>
          </section>
          <section className="form-section">
            <svg
              className="hotel-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 32C0 14.3 14.3 0 32 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32zm96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H112zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8H328z" />
            </svg>
            <div className="form-section-container">
              <div className="form-description">
                <h3 className="heading-tertiary">Menu Management:</h3>
                <p>
                  Easily update and customize the restaurant's menu items with
                  the intuitive menu management system. Add new dishes, edit
                  existing ones, adjust prices, and specify dietary information
                  or special instructions. Organize menu items into categories
                  and subcategories for easy navigation. →
                </p>
              </div>
              <div className="form-container">
                <fieldset>
                  <legend className="legend">Menu Manager</legend>
                  <form
                    className="form"
                    onSubmit={handleSubmits}
                    action="/upload"
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <ul className="form-list">
                      <li className="form-list-item">
                        <label>Food Name: </label>
                        <input
                          type="text"
                          value={foodName}
                          onChange={(e) => setFoodName(e.target.value)}
                        />
                      </li>
                      <li className="form-list-item">
                        <label>Food Description: </label>
                        <input
                          type="text"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </li>
                      <li className="form-list-item">
                        <label>Price: </label>
                        <input
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </li>
                      <li className="form-list-item">
                        <label>Minimum Price: </label>
                        <input
                          type="text"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </li>
                      <label>Upload Image </label>
                      <input
                        className="img-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </ul>
                    {error && <p className="error">{error}</p>}
                    <button className="submit-btn" type="submit">
                      <svg
                        className="submit-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>
                      <br />
                      upload
                    </button>
                  </form>
                </fieldset>
              </div>
            </div>
          </section>
          <section className="section-dishes">
            <svg
              className="dishes-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
            </svg>
            <h3>Uploaded Dishes</h3>
            <div className="main-course2">
              {fetError && <p className="delivery-error">{fetError}</p>}
              {foods.map((food) => (
                <div className="overall2" key={food._id}>
                  <div className="content-box2">
                    <img
                      className="card-img"
                      src={food.productPictures[0]}
                      alt="beans img"
                    />
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
                      onClick={() => openModal2(food._id)}
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
                  <form
                    onSubmit={handleSubmit(handleEdit)}
                    className="modal-form"
                  >
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
                      {...register("price", { valueAsNumber: true })}
                    />
                    <br />
                    <input
                      className="modal-input"
                      type="number"
                      placeholder="Minimum Price"
                      {...register("minimumPrice", { valueAsNumber: true })}
                    />
                    {updateError && <p className="error">{updateError}</p>}

                    <div className="btn-chamber">
                      <button
                        disabled={!isValid}
                        className={
                          isValid ? "modal-button cnfm" : "modal-button cnfm2"
                        }
                        type="submit"
                      >
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

export default RestaurantLandingPage;
