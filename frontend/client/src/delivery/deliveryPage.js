import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DeliveryLoginPage from "./delliveryLoginPage";
import { jwtDecode } from "jwt-decode";
import AdminHeader from "../admin/adminHeader";
import Swal from "sweetalert2";

const DeliveryPersonnelPage = () => {
  const token = Cookies.get("foodieToken");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [availableOrder, setAvailableOrder] = useState([]);
  const [acceptedOrder, setAcceptedOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [decode, setDecode] = useState("");

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

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:2300/api/v1/orders");
      const data = await response.json();
      const actualData = data.data;
      console.log(actualData)
      setOrders(actualData);

      const updateAvailableOrder = actualData.filter(
        (item) => item.status == "placed"
      );
      setAvailableOrder(updateAvailableOrder);
      // set accepted orders state
      const updateAcceptedOrder = actualData.filter(
        (item) => item.status == "confirmed"
      );
      setAcceptedOrder(updateAcceptedOrder);

      // set delivered orders state
      const updateDeliveredOrder = actualData.filter(
        (item) => item.status == "Delivered"
      );
      setDeliveredOrder(updateDeliveredOrder);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const handleSelection = (order) => {
    const updatedOrder = [...selectedOrder];
    const existingOrder = updatedOrder.find((item) => item.id === order.id);
    if (existingOrder) {
      setSelectedOrder([...selectedOrder]);
    } else {
      setSelectedOrder([...selectedOrder, order]);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    console.log(orderId)
    try {
      // Send a request to your backend API to mark the order as accepted
     const response= await axios
        .put(`http://localhost:2300/api/v1/orders/${orderId}`, {
          status: "confirmed",
        }, {withCredentials: true})

          if (response.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Order Confirmed",
              showConfirmButton: false,
              timer: 1500,
            });

            const updateSelectedOrder = selectedOrder.filter(
              (item) => item.id !== orderId
            );

            setSelectedOrder(updateSelectedOrder);
            fetchOrders();
          }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error accepting order:", error);
    }
  };

  const handleCancel = (selectedId) => {
    const updateSelectedOrder = selectedOrder.filter(
      (item) => item.id !== selectedId
    );
    setSelectedOrder(updateSelectedOrder);
    // setSelectedOrder(null); // Reset the selected order
  };
  const handleDelivered = async (orderId) => {
    try {
      // Send a request to your backend API to mark the order as accepted
      const response = await axios.put(`http://localhost:2300/api/v1/orders/${orderId}`, {
        status: "Delivered",
      },{withCredentials: true});
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

      const updateSelectedOrder = selectedOrder.filter(
        (item) => item.id !== orderId
      );
      setSelectedOrder(updateSelectedOrder);
      fetchOrders();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error delivering order:", error);
    }
  };

  return (
    <>
      {decode === "delivery" ? (
        <div>
          <AdminHeader />
          <h2>Delivery Personnel Page</h2>
          <ul>
            {availableOrder.map((order) => (
              <li key={order._id}>
                Order #{order._id} - Status: {order.status}
                <button onClick={() => handleSelection(order)}>View</button>
              </li>
            ))}
          </ul>

          {selectedOrder && (
            <div>
              <h3>Selected Order</h3>
              {selectedOrder.map((order) => {
                return (
                  <div>
                    <div className="selectedOrder">
                      <div className="selectedOrder-header">
                        <p>Order #{order._id}</p>
                        <p>Status: {order.status}</p>
                      </div>
                      <div className="selectedOrder-details">
                        <div className="orderDetails">
                          <p>{order.name}</p>
                          <p>{order.price}</p>
                        </div>
                        <div className="restaurantDetails">
                          <h5>{order.restaurantName}</h5>
                          <p>{order.restaurantAddress}</p>
                          <p>{order.restaurantContact}</p>
                        </div>
                        <div className="customerDetails">
                          <h5>{order.customerName}</h5>
                          <p>{order.customerAddress}</p>
                          <p>{order.customerContact}</p>
                        </div>
                      </div>
                      <button onClick={() => handleAcceptOrder(order._id)}>
                        Accept Order
                      </button>
                      <button onClick={() => handleCancel(order._id)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div>
            <h3>Accepted Orders</h3>
            {acceptedOrder && (
              <ul>
                {acceptedOrder.map((order) => (
                  <li key={order._id}>
                    Order #{order._id} - Status: {order.status}
                    <button onClick={() => handleDelivered(order._id)}>
                      Delivered
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <DeliveryLoginPage />
      )}
    </>
  );
};

export default DeliveryPersonnelPage;
