import React, { useState, useEffect } from "react";
import axios from "axios";

const DeliveryPersonnelPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [availableOrder, setAvailableOrder] = useState([]);
  const [acceptedOrder, setAcceptedOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);

  useEffect(() => {
    // Fetch existing orders from your backend API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:2300/api/v1/orders");
      const data = await response.json();
      const actualData = data.data;
      setOrders(actualData);


       const updateAvailableOrder = actualData.filter(
         (item) => item.status == "Available"
       );
      setAvailableOrder(updateAvailableOrder);
      // set accepted orders state
      const updateAcceptedOrder = actualData.filter(
        (item) => item.status == "Accepted"
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

  const handleAcceptOrder = (orderId) => {
    try {
      // Send a request to your backend API to mark the order as accepted
      axios
        .put(`http://localhost:2300/api/v1/orders/${orderId}`, {
          status: "Accepted",
        })
        .then(() => {
          
          // Update the local state to reflect the accepted order
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? { ...order, status: "Accepted" } : order
            )
          );
        });

      const updateSelectedOrder = selectedOrder.filter(
        (item) => item.id !== orderId
      );

      setSelectedOrder(updateSelectedOrder);
      fetchOrders();
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
      await axios.put(`http://localhost:2300/api/v1/orders/${orderId}`, {
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
      fetchOrders();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
    // setSelectedOrder(null); // Reset the selected order
  };

  return (
    <div>
      <h2>Delivery Personnel Page</h2>
      <ul>
        {availableOrder.map((order) => (
          <li key={order.orderId}>
            Order #{order.orderId} - Status: {order.status}
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
                    <p>Order #{order.orderId}</p>
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
                  <button onClick={() => handleAcceptOrder(order.orderId)}>
                   Accept Order
                  </button>
                  <button onClick={() => handleCancel(order.orderId)}>
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
              <li key={order.orderId}>
                Order #{order.orderId} - Status: {order.status}
                <button onClick={() => handleDelivered(order.orderId)}>
                  Delivered
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeliveryPersonnelPage;