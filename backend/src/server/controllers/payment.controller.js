const axios = require('axios');
const Order = require('../../models/order');
const Product = require('../../models/product');
const Transaction = require('../../models/transaction');
const random = require('random-string-generator');
const Cart = require('../../models/cart');
const Restaurant = require('../../models/restaurant');

class PaymentController {
  static async charge(req, res) {
    try {
      const { products, totalPrice, redirectUrl, cartId, customer } = req.body;
      const txRef = random('upper');

      let meta = {
        products,
        customer,
        totalPrice,
      };

      const data = {
        tx_ref: txRef,
        amount: totalPrice,
        currency: 'NGN',
        redirect_url: redirectUrl
          ? redirectUrl
          : `http://localhost:3000/verify`,
        customer: {
          email: customer.email,
          phonenumber: customer.phoneNumber,
          name: customer.name,
        },
      };

      const response = await axios.post('https://api.flutterwave.com/v3/payments', data, {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          },
        }
      );

      const txn = new Transaction({
        products: JSON.stringify(meta),
        txRef,
        cart: cartId,
      });

      await txn.save();

      if (response.data.status === 'success') {
        res.json({ message: response.data.message, data: response.data.data.link });
      } else {
        res.status(500).send({ message: 'Payment failed!' });
      }
    } catch (error) {
      res.status(500).send({ message: 'An error ocurred!' });
    }
  }

  static async verify(req, res) {
    try {
      let { tx_ref } = req.body;
      const txRef = tx_ref;
      let txn = await Transaction.findOne({ txRef: tx_ref });

      let txnProduct = JSON.parse(txn.products);
      const response = await axios.get(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`, {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          },
        }
      );

      if (response) {
        if (response.data.data.status === 'successful') {
          const { products, totalPrice, customer } = txnProduct;

          const orderProducts = [];

          for (const product of products) {
            const dbProduct = await Product.findById(product.product._id);
            const restaurantOb = await Restaurant.findById( dbProduct.restaurant ).select('-password');
            if (!dbProduct) {
              return res.status(404).json({ message: `Product with ID ${product._id} not found` });
            }
            orderProducts.push({
              productId: dbProduct._id,
              name: dbProduct.name,
              quantity: product.quantity,
              price: product.price,
              restaurant: restaurantOb,
            });
          }
          const orderId = random('upper');
          const newOrder = new Order({
            products: orderProducts,
            customer,
            totalPrice,
            orderId: orderId,
          });

          await newOrder.save();

          await Transaction.findOneAndUpdate(
            { txRef },
            { status: 'successful' },
            { new: true }
          );
          await Cart.findByIdAndDelete(txn.cart);

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
        res.status(400).json({ message: 'Unable to verify transaction!!!' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error verifying payments!' });
    }
  }
}

module.exports = PaymentController;
