import React, { useState, useEffect } from "react";
import data from "./data.json";

const DeliveryPersonnelPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);

  useEffect(() => {
    // Fetch existing orders from your backend API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // try {
    //   const response = await fetch("your_backend_api/orders");
    //   const data = await response.json();
    //   setOrders(data);
    // } catch (error) {
    //   console.error("Error fetching orders:", error);
    // }
    setOrders(data);
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
    try {
      // Send a request to your backend API to mark the order as accepted
      await fetch(`your_backend_api/orders/${orderId}/accept`, {
        method: "PUT",
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
  };

  const handleCancel = (selectedId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedId ? { ...order, status: "Cancelled" } : order
      )
    );
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
    </div>
  );
};

export default DeliveryPersonnelPage;
