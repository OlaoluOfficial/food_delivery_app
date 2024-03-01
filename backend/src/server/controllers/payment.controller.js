// const stripe = require("stripe")(process.env.STRIPE_API_KEY);
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

}

module.exports = PaymentController;
