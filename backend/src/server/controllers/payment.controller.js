const axios = require('axios');
const Order = require('../../models/order');
const Product = require("../../models/product");
const Transaction = require('../../models/transaction');
const random = require('random-string-generator')

class PaymentController {
  static async charge(req, res) {
    try {
      const { email, phoneNumber, name, products, totalPrice, redirectUrl } = req.body;
      const customer = req.user.id;
      const txRef = random('upper');

      let meta = {
        products,
        customer,
        totalPrice
      }

      const data = {
        "tx_ref": txRef,
        amount: totalPrice,
        currency: 'NGN',
        "redirect_url": redirectUrl ? redirectUrl : `http://localhost:3000/verify/:${txRef}`,
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

      const txn = new Transaction({ products: JSON.stringify(meta), txRef });

      await txn.save();
      
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

  static async verify(req, res) {
    try {
      let { tx_ref } = req.body;
      const txRef = tx_ref
      let txn = await Transaction.findOne({ txRef : tx_ref });
      let txnProduct = JSON.parse(txn.products)
      const response = await axios.get(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`, {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
      });

      if (response) {
        if (response.data.data.status === 'successful') {
          const { products, totalPrice, customer } = txnProduct;

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
        
        const newOrder = new Order({
          products: orderProducts,
          customer,
          totalPrice,
        });

          await newOrder.save();

          await Transaction.findOneAndUpdate(
            { txRef },
            { status: 'successful' },
            { new: true }
          );
          return res.status(200).json({ message: 'Payment Successful' });
        } else {
          await Transaction.findOneAndUpdate(
            { txRef },
            { status: 'failed' },
            { new: true }
          );
          return res.status(200).json({ message: 'Payment Failed' });
        }
      } else {
        res.status(400).json({ message: 'Unable to verify transaction!!!' })
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error!' });
    }
  }
}

module.exports = PaymentController;
