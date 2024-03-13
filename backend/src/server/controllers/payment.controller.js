const axios = require('axios');

class PaymentController {
  static async charge(req, res) {
    try {
      const { amount, email, txRef, phoneNumber, name, redirectUrl } = req.body;

      const data = {
        tx_ref: `${txRef}_PMCK`,
        amount,
        currency: 'NGN',
        redirect_url: redirectUrl,
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
}

module.exports = PaymentController;
