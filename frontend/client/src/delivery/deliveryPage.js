import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DeliveryLoginPage from "./delliveryLoginPage";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import DeliveryHeader from "./deliveryHeader";
import "./deliveryPage.css";
import img from "../users/img/EatRite-logo.png";
import Modal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import logo from "../users/img/footer-logo.png";

const DeliveryPersonnelPage = () => {
  const token = Cookies.get("foodieToken");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [availableOrder, setAvailableOrder] = useState([]);
  const [acceptedOrder, setAcceptedOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [decode, setDecode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    // Fetch existing orders from your backend API
    fetchOrders();
  }, []);

  useEffect(() => {
    if (token) {
      var decoded = jwtDecode(token);
      setDecode(decoded.user.role);
    }
  }, []);

  const openModal = (item) => {
    setSelectedOrder(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedOrder("");
    setModalOpen(false);
  };
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:2300/api/v1/orders");
      const data = await response.json();
      const actualData = data.data;
      console.log(actualData);
      setOrders(actualData);

      const updateAvailableOrder = data.filter(
        (item) => item.status === "placed"
      );
      setAvailableOrder(updateAvailableOrder);
      // set accepted orders state
      const updateAcceptedOrder = data.filter(
        (item) => item.status === "confirmed"
      );
      setAcceptedOrder(updateAcceptedOrder);

      // set delivered orders state
      const updateDeliveredOrder = data.filter(
        (item) => item.status === "Delivered"
      );
      setDeliveredOrder(updateDeliveredOrder);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSelection = async (order) => {
    const updatedOrder = [...selectedOrder];
    const existingOrder = updatedOrder.find((item) => item._id === order._id);
    if (existingOrder) {
      setSelectedOrder([...selectedOrder]);
    } else {
      setSelectedOrder([...selectedOrder, order]);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    console.log(orderId);
    try {
      // Send a request to your backend API to mark the order as accepted
      const response = await axios.put(
        `http://localhost:2300/api/v1/orders/${orderId}`,
        {
          status: "confirmed",
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order Confirmed",
          showConfirmButton: false,
          timer: 1500,
        });
        closeModal();

        fetchOrders();
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong, Please try again later",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error accepting order:", error);
    }
  };

  const handleDelivered = async (orderId) => {
    try {
      // Send a request to your backend API to mark the order as accepted
      const response = await axios.put(
        `http://localhost:2300/api/v1/orders/${orderId}`,
        {
          status: "delivered",
        },
        { withCredentials: true }
      );
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order Delivered",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchOrders();
      }
      fetchOrders();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong, Please try again later",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error delivering order:", error);
    }
  };

  return (
    <>
      {decode === "delivery" ? (
        <div className="delivery-container">
          <section className="section-delivery-hero">
            <DeliveryHeader />
            <img className="hero-img" src={img} alt="hero-img" />
            <h1 className="heading-primary">DeliveryPersonnel</h1>
          </section>
          <section className="section-orders">
            <svg
              className="hotel-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M312 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h25.7l34.6 64H222.9l-27.4-38C191 99.7 183.7 96 176 96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h43.7l22.1 30.7-26.6 53.1c-10-2.5-20.5-3.8-31.2-3.8C57.3 224 0 281.3 0 352s57.3 128 128 128c65.3 0 119.1-48.9 127-112h49c8.5 0 16.3-4.5 20.7-11.8l84.8-143.5 21.7 40.1C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L375.4 48.8C369.8 38.4 359 32 347.2 32H312zM458.6 303.7l32.3 59.7c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-32.3-59.7c3.6-.6 7.4-.9 11.2-.9c39.8 0 72 32.2 72 72s-32.2 72-72 72s-72-32.2-72-72c0-18.6 7-35.5 18.6-48.3zM133.2 368h65c-7.3 32.1-36 56-70.2 56c-39.8 0-72-32.2-72-72s32.2-72 72-72c1.7 0 3.4 .1 5.1 .2l-24.2 48.5c-9 18.1 4.1 39.4 24.3 39.4zm33.7-48l50.7-101.3 72.9 101.2-.1 .1H166.8zm90.6-128H365.9L317 274.8 257.4 192z" />
            </svg>
            <div className="form-section-container">
              <div className="form-description">
                <h3 className="heading-tertiary">My Assignments</h3>
                <p>
                  View and manage your current delivery assignments here. Stay
                  organized with details such as delivery addresses, time
                  windows, and special instructions. Mark assignments as
                  completed and provide status updates in real-time.
                </p>
                <br />
                <p>
                  Keep track of your delivery schedule with ease. Access your
                  upcoming shifts, delivery routes, and rest periods
                </p>
              </div>
              <fieldset>
                <legend className="legend">Orders</legend>
                {availableOrder.length > 0 ? (
                  <ul className="order-list">
                    {availableOrder.map((order) => (
                      <li key={order._id} className="order-list-item">
                        Order #{order.orderId} - Status: {order.status}
                        <button
                          className="menu-btn bg-brown mar-right mar-left"
                          onClick={() => openModal(order)}
                        >
                          View
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ textAlign: "center" }}>No Available Orders yet</p>
                )}
              </fieldset>
            </div>
          </section>
          <section className="section-viewed-orders">
            {selectedOrder && (
              <div>
                <div className="modal-container-delivery">
                  <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    className="modal-delivery"
                  >
                    <FaXmark
                      className="modal-icon"
                      onClick={() => setModalOpen(false)}
                    />
                    <h3>OrderId: {selectedOrder.orderId}</h3>
                    <div
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      <h4>Customer Details:</h4>
                      <div>
                        <p>{selectedOrder.customer.name}</p>
                        <p>{selectedOrder.customer.location}</p>
                        <p>{selectedOrder.customer.phoneNumber}</p>
                      </div>
                    </div>
                    <div>
                      <h4>Food Details:</h4>
                      {selectedOrder.products.map((food) => {
                        return (
                          <div key={food._id} className="delivery-modal-food">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p>
                                <b>{food.name}</b>
                              </p>
                              <p>Quantity: {food.quantity}</p>
                            </div>
                            <p>Restaurant: {food.restaurant.name}</p>
                            <p>Location: {food.restaurant.location}</p>
                            <p>Tel.: {food.restaurant.phoneNumber}</p>
                          </div>
                        );
                      })}
                    </div>

                    {updateError && <p className="error">{updateError}</p>}

                    <div className="btn-chamber-delivery">
                      <button
                        className="menu-btn bg-org mar-right"
                        onClick={() => handleAcceptOrder(selectedOrder._id)}
                      >
                        Accept Order
                      </button>
                      <button
                        className="menu-btn bg-org mar-right"
                        onClick={() => closeModal()}
                      >
                        Cancel
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
            )}
          </section>
          <div>
            {acceptedOrder.length > 0 && (
              <>
                <h3>Accepted Orders</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer's Name</th>
                        <th>Customer's Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {acceptedOrder.map((order) => (
                        <tr key={order._id}>
                          <td>{order.orderId}</td>
                          <td>{order.customer.name}</td>
                          <td>{order.customer.location}</td>
                          <td>{order.status}</td>
                          <td>
                            {
                              <>
                                <button
                                  className="menu-btn bg-org mar-right"
                                  onClick={() => handleDelivered(order._id)}
                                >
                                  Order Delivered
                                </button>
                              </>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <DeliveryLoginPage />
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

export default DeliveryPersonnelPage;
