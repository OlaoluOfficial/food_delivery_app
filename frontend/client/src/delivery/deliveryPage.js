import React, { useState, useEffect } from "react";

const DeliveryPersonnelPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch existing orders from your backend API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("your_backend_api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
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

      // Reset the selected order
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  return (
    <div>
      <h2>Delivery Personnel Page</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Status: {order.status}
            <button onClick={() => setSelectedOrder(order)}>Accept</button>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div>
          <h3>Selected Order</h3>
          <p>Order #{selectedOrder.id}</p>
          <p>Status: {selectedOrder.status}</p>
          <button onClick={() => handleAcceptOrder(selectedOrder.id)}>
            Accept Order
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryPersonnelPage;
