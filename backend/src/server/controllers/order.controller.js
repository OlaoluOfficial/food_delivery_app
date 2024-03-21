const Order = require("../../models/order");
const Product = require("../../models/product");
const sendEmailNotification = require("./email.controller");
class OrderController {
  static async createOrder(req, res) {
    try {
      const { products, totalPrice } = req.body;
      const customer = req.user.id;

      const orderProducts = [];

      for (const product of products) {
        const dbProduct = await Product.findById(product.product._id);
        if (!dbProduct) {
          return res
            .status(404)
            .json({ message: `Product with ID ${product._id} not found` });
        }
        orderProducts.push({
          productId: dbProduct._id,
          name: dbProduct.name,
          quantity: product.quantity,
          price: product.price,
          restaurantId: dbProduct.restaurant,
        });
      }
      console.log(orderProducts);
      const newOrder = new Order({
        products: orderProducts,
        totalPrice,
        customer: customer,
      });

      await newOrder.save();

      res
        .status(200)
        .json({ message: "Order Successfully Created", data: newOrder });
    } catch (error) {
      console.log(error.message);
      return new Error("Could not create order");
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find({});
      res
        .status(200)
        .json({ message: "Orders fetched successfully", data: orders });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async getOrder(req, res) {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res
        .status(200)
        .json({ message: "Order fetched successfully", data: order });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  static async updateOrder(req, res) {
    try {
      const { orderId } = req.params;
      const postmanId = req.user.id;
      const { status } = req.body;
      const updateData = {
        status,
        postman: postmanId,
      };

      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        updateData,
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      const customer = updatedOrder.customer;
      const restaurant = updatedOrder.products[0].restaurant;

      await updatedOrder.save();

      const mailOptions = {
        from: "olaoluofficial@gmail.com",
        to: [customer.email, restaurant.email],
        subject: "Order Updated",
        text: `Your order with ID ${updatedOrder.id.substring(
          0,
          4
        )} has been updated to "${updateData.status.toUpperCase()}".`,
      };

      sendEmailNotification(mailOptions);

      res.status(200).json(updatedOrder);
    } catch (err) {
      console.error("Error updating order:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = OrderController;
