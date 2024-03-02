const Order = require('../../models/order');
const User = require('../../models/user');
const Restaurant = require('../../models/restaurant');
const sendEmailNotification = require('./email.controller');
class OrderController {
  static async createOrder(req, res) {
    try {
      const {
        product,
        price,
        customer,
        restaurant,
      } = req.body;

    
      const order = new Order({
        product,
        price,
        customer,
        restaurant
      });

      // Save the order to the database
      await order.save();

      res
        .status(200)
        .json({ message: 'Order Successfully Created', data: order });
    // } 
  }catch (error) {
      console.log(error.message);
      return new Error('Could not create order');
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find({});
      res.status(200).json({ message: 'Orders fetched successfully', data: orders });
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
      const customer = await User.findOne({
        _id: updatedOrder.customer
      })

      const restaurant = await Restaurant.findOne({
        _id: updatedOrder.restaurant
      })

      const mailOptions = {
        from: 'olaoluofficial@gmail.com',
        to: [customer.email, restaurant.email],
        subject: 'Order Updated',
        text: `Your order with ID ${updatedOrder.id.substring(0, 4)} has been updated to "${updateData.status.toUpperCase()}".`,
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
