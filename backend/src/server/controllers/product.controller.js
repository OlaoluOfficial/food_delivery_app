const Product = require('../../models/product');

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, description, price, minimumPrice, restaurant } = req.body;

      const product = new Product({
        name,
        description,
        price,
        minimumPrice,
        restaurant,
      });
      await product.save();

      res.status(200).json({ message: "Product Successfully Created", data: product});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  catch(error) {
    console.log(error.message);
    return new Error('Could not create order');
  }

  static async getAllProducts  (req, res) {
    try {
      const products = await Product.find().populate('restaurant');
      res.status(200).json({ message: "Products fetched successfully", data: products});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async getProduct (req, res) {
    try {
      const product = await Product.findById(req.params.orderId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: "Product fetched successfully", data: product });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}


module.exports = ProductController;
