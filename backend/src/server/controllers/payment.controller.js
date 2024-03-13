const axios = require('axios');
const Order = require('../../models/order');

class PaymentController {
  static async charge(req, res) {
    try {
      const { email, txRef, phoneNumber, name, redirectUrl, products, totalPrice } = req.body;
      const customer = req.user.id;

      const data = {
        tx_ref: `${txRef}_PMCK`,
        amount: totalPrice,
        currency: 'NGN',
        redirect_url: redirectUrl,
        meta: {
          products,
          totalPrice,
          customer
        },
        customer: {
          email,
          phonenumber: phoneNumber,
          name
        }
      }

      const response = await axios.post("https://api.flutterwave.com/v3/payments", data, {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
      });
      
      if (response.data.status === 'success') {
        res.json({ message: response.data.message, data: response.data.data.link });
      } else {
        res.status(500).send({ message: 'Payment failed!' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  }

  static async handleWebhook(req, res) {
    try {
      const { hash } = req.body;
      const eventData = req.body;
      console.log(eventData);

      const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
      if (hash) {
        if (hash !== secretHash) {
          console.error('Invalid webhook signature');
          return res.status(401).send('Unauthorized');
        }
      }
      switch (eventData.event_type) {
        case 'payment.success':
          console.log('Payment successful:', eventData.data);
          break;
        case 'payment.failure':
          console.log('Payment failed:', eventData.data);
          break;
        default:
          console.log('Unknown event type:', eventData.event_type);
          break;
      }

      // Respond to Flutterwave with a 200 OK status to acknowledge receipt of the webhook event
      res.status(200).send('Webhook received successfully');
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).send('Internal server error');
    }
  }

  static async paymentComplete(req, res) {
    const data = req.body.data;
    const meta = data.meta || {};

    const orderId = meta.order_id;
  
    if (data.status === 'successful') {
      console.log('Payment successful! Order ID:', orderId);

      const { products, totalPrice, customer } = meta;

      const orderProducts = [];

      for (const product of products) {
        const dbProduct = await product.findById(product.productId)
        if (!dbProduct) {
          return res.status(404).json({ message: `Product with ID ${product.productId} not found` })
        }
        orderProducts.push({
          productId: dbProduct._id,
          name: dbProduct.name,
          quantity: product.quantity,
          price: dbProduct.price,
          restaurantId: dbProduct.restaurant
        });
      }
    
      const newOrder = new Order({
        products: orderProducts,
        customer,
        totalPrice
      });

      await newOrder.save();
      res.send('Payment successful!');
    } else {
      console.log('Payment failed.');
      res.send('Payment failed.');
    }
  }
}

module.exports = PaymentController;
