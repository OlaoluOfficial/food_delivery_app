const Order = require('../../models/order');
const sendEmailNotification = require('./email.controller');
class OrderController {
  static async createOrder(req, res) {
    try {
      const {
        product,
        price,
        customerName,
        customerAddress,
        customerEmail,
        customerPhoneNumber,
        restaurantName,
        restaurantAddress,
        restaurantPhoneNumber,
        restaurantEmail,
      } = req.body;

      // Create a new order instance
      const order = new Order({
        product,
        price,
        customerName,
        customerAddress,
        customerEmail,
        customerPhoneNumber,
        restaurantName,
        restaurantAddress,
        restaurantPhoneNumber,
        restaurantEmail,
      });

      // Save the order to the database
      await order.save();

      res
        .status(200)
        .json({ message: 'Order Successfully Created', data: order });
    } catch (error) {
      console.log(error.message);
      return new Error('Could not create order');
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find({});
      res
        .status(200)
        .json({ message: 'Orders fetched successfully', data: orders });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async getOrder(req, res) {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res
        .status(200)
        .json({ message: 'Order fetched successfully', data: order });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async updateOrder(req, res) {
    try {
      const { orderId } = req.params;
      const updateData = req.body;

      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        updateData,
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      const mailOptions = {
        from: 'olaoluofficial@gmail.com',
        to: [updatedOrder.customerEmail, updatedOrder.restaurantEmail],
        subject: 'Order Updated',
        text: `Your order with ID ${updatedOrder.id} has been updated.`,
      };

      sendEmailNotification(mailOptions);

      res.status(200).json(updatedOrder);
    } catch (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = OrderController;
