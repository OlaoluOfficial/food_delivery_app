import React, { useState, useEffect } from "react";
import data from "./data.json";
import axios from "axios";

const DeliveryPersonnelPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [acceptedOrder, setAcceptedOrder] = useState([]);

  useEffect(() => {
    // Fetch existing orders from your backend API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:2300/api/v1/orders");
      const data = await response.json();
      setOrders(data.data);
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

  const handleAcceptOrder = (orderId) => {
    try {
      // Send a request to your backend API to mark the order as accepted
      axios
        .put(`http://localhost:2300/api/v1/orders/${orderId}`, {
          status: "Accepted",
        })
        .then(() => {});
      // Update the local state to reflect the accepted order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Accepted" } : order
        )
      );

      const updateSelectedOrder = selectedOrder.filter(
        (item) => item.id !== orderId
      );
      setSelectedOrder(updateSelectedOrder);
    } catch (error) {
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
      await axios.put(`your_backend_api/orders/${orderId}`, {
        status: "Delivered",
      });

      // Update the local state to reflect the accepted order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Accepted" } : order
        )
      );

      const updateSelectedOrder = selectedOrder.filter(
        (item) => item.id !== orderId
      );
      setSelectedOrder(updateSelectedOrder);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
    setSelectedOrder(null); // Reset the selected order
  };

  return (
    <div>
      <h2>Delivery Personnel Page</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Status: {order.status}
            <button onClick={() => handleSelection(order)}>Accept</button>
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
                    <p>Order #{order.id}</p>
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
                  <button onClick={() => handleAcceptOrder(order.id)}>
                    Accept Order
                  </button>
                  <button onClick={() => handleCancel(order.id)}>Cancel</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {acceptedOrder && (
        <ul>
          {acceptedOrder.map((order) => (
            <li key={order.id}>
              Order #{order.id} - Status: {order.status}
              <button onClick={() => handleDelivered(order)}>Delivered</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveryPersonnelPage;
