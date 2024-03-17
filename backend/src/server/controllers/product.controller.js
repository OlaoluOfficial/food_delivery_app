const Product = require('../../models/product');
const fs = require("fs").promises;

class ProductController {
  static async createProduct(req, res) {
    try {
      console.log(req.body)
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
    } 
    catch(error) {
      console.log(error.message);
      return new Error('Could not create order');
    }
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
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: "Product fetched successfully", data: product });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async updateProduct (req, res) {
    try {
      const productId = req.params.productId;
      const updateData = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  static async uploadItem (req, res) {
    const userRole = req.user.role;
    const productPics = req.files;
    const restaurantId = req.user.id;
    //   const regNo = req.user.registrationNo;
    const { productName, description, price, minimumPrice} = req.body;
    
    if (userRole !== "restaurant" ) {
      return res.status(401).json({ message: "You are not authorized to perform this action" });
    }
    try {
      const prodPics = productPics.map((file) => file.path);  
    
      const product = new Product({
        restaurant: restaurantId,
        name: productName,
        description: description,
        price: price,
        productPictures: [],
        minimumPrice
      });

      const newProduct = await product.save();

      if (newProduct) {
        await Product.findByIdAndUpdate(
          { _id: newProduct.id },
          { $push: { productPictures: { $each: prodPics } } },
          { new: true }
        );
      }
    
      return res.status(201).json({ message: "Product uploaded successfully" });
    } catch (error) {
      productPics.forEach(async (file) => {
        await fs.unlink(file.path);
      });
    
      console.error(`Error uploading product: ${error}`);
      return res.status(500).json({ message: "Failed to upload product" });
    }
  } 

  static async deleteProduct (req, res) {
    const productId = req.params.productId;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = ProductController;
