const Cart = require('../../models/cart');

class CartController {
  static async addItemToCart(req, res) {
    try {
      const { productId, quantity, price } = req.body;
      const userId = req.user.id;
  
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      const index = cart.items.findIndex(item => item.product.toString() === productId);
  
      if (index !== -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price });
      }
  
      await cart.save();
  
      res.json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async removeItemFromCart (req, res) {
    try {
      const { itemId } = req.params;
      const userId = req.user.id;
  
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }
  
      // Filter out the item to be removed
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  
      await cart.save();
  
      res.json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  
  static async getUserCart(req, res) {
    try {
      const userId = req.user.id;
  
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
      if (!cart) {
        return res.status(404).json({ msg: 'Your Cart is empty' });
      }
  
      res.json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}


module.exports = CartController;
